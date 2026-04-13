/**
 * Supabase to Lark Sync Skill
 * Regular scheduled sync of events and promoters from Supabase to Lark Base
 *
 * Usage:
 * - syncAll() - Sync all real data from Supabase to Lark
 * - syncUsers() - Sync only user/promoter data
 * - syncEvents() - Sync only events data
 * - validateSync() - Validate all synced data
 */

const LARK_CONFIG = {
  appToken: 'W1iEbORCia4NC4shfCZjkIyXpUh',
  tables: {
    promoters: 'tbl7s9VVAep6Zzyk',
    events: 'tblZDb8ara1auYLM'
  }
};

const SUPABASE_CONFIG = {
  url: 'https://amcqlvpejznkyyrjaoos.supabase.co',
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtY3FsdnBlanpua3l5cmphb29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNzYyNTUsImV4cCI6MjA4NTY1MjI1NX0.qqcfBEvmI4Qsf-YSqIwooOFDkRri8w67DA5OTXm6hyc'
};

/**
 * Extract real users from Supabase via edge function
 */
async function extractRealUsers() {
  console.log('👥 Extracting real users from Supabase...');

  try {
    const response = await fetch(`${SUPABASE_CONFIG.url}/functions/v1/extract-users`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.apikey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.apikey}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const users = data.users || [];

    // Transform user data for sync
    const transformedUsers = users.map(user => ({
      id: user.id,
      full_name: user.user_metadata?.full_name || user.user_metadata?.display_name || 'Unknown User',
      account_type: user.user_metadata?.account_type || 'promoter',
      bio: `Real user from Supabase - Email: ${user.email} - Account Type: ${user.user_metadata?.account_type || 'promoter'}`,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      total_commission_earned: 0,
      risk_score: 0,
      total_sales: 0,
      tickets_sold: 0,
      commission_pending: 0,
      active_events: 0
    }));

    console.log(`✅ Extracted ${transformedUsers.length} users`);
    return transformedUsers;

  } catch (error) {
    console.error('❌ Error extracting users:', error);
    throw error;
  }
}

/**
 * Extract real events from Supabase
 */
async function extractRealEvents() {
  console.log('📅 Extracting real events from Supabase...');

  try {
    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/events?select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.apikey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.apikey}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const events = await response.json();

    console.log(`✅ Extracted ${events.length} events`);
    return events;

  } catch (error) {
    console.error('❌ Error extracting events:', error);
    throw error;
  }
}

/**
 * Sync a single profile to Lark with UPSERT logic
 */
async function syncProfile(profileData) {
  console.log(`📝 Syncing profile: ${profileData.full_name || profileData.id}`);

  // Transform data for Lark
  const larkFields = {
    'SB ID': profileData.id,
    'Promoter Name': profileData.full_name || '',
    'Status': profileData.account_type === 'promoter' ? 'Active' : 'Active',
    'Total Sales': profileData.total_sales || 0,
    'Tickets Sold': profileData.tickets_sold || 0,
    'Commission Earned': profileData.total_commission_earned || 0,
    'Commission Pending': profileData.commission_pending || 0,
    'Active Events': profileData.active_events || 0,
    'Notes': profileData.bio || ''
  };

  // Add date fields if available
  if (profileData.created_at) {
    larkFields['Joined Date'] = new Date(profileData.created_at).getTime();
  }

  if (profileData.last_sale_date) {
    larkFields['Last Sale'] = new Date(profileData.last_sale_date).getTime();
  }

  // Adjust status based on risk score
  if (profileData.risk_score && profileData.risk_score >= 80) {
    larkFields['Status'] = 'Suspended';
  }

  try {
    // Check if record exists
    const searchResult = await mcp__lark_mcp__bitable_v1_appTableRecord_search({
      path: {
        app_token: LARK_CONFIG.appToken,
        table_id: LARK_CONFIG.tables.promoters
      },
      data: {
        filter: {
          conjunction: 'and',
          conditions: [{
            field_name: 'SB ID',
            operator: 'is',
            value: [profileData.id]
          }]
        },
        page_size: 1
      },
      useUAT: true
    });

    if (searchResult.items && searchResult.items.length > 0) {
      // Update existing record
      const recordId = searchResult.items[0].record_id;
      console.log(`🔄 Updating existing record: ${recordId}`);

      await mcp__lark_mcp__bitable_v1_appTableRecord_update({
        path: {
          app_token: LARK_CONFIG.appToken,
          table_id: LARK_CONFIG.tables.promoters,
          record_id: recordId
        },
        data: { fields: larkFields },
        useUAT: true
      });

      console.log(`✅ Updated profile: ${profileData.full_name}`);
      return { action: 'updated', recordId };

    } else {
      // Create new record
      console.log(`➕ Creating new record`);

      const result = await mcp__lark_mcp__bitable_v1_appTableRecord_create({
        path: {
          app_token: LARK_CONFIG.appToken,
          table_id: LARK_CONFIG.tables.promoters
        },
        data: { fields: larkFields },
        useUAT: true
      });

      console.log(`✅ Created profile: ${profileData.full_name}`);
      return { action: 'created', recordId: result.record.record_id };
    }

  } catch (error) {
    console.error(`❌ Error syncing profile ${profileData.id}:`, error);
    throw error;
  }
}

/**
 * Sync a single event to Lark with UPSERT logic
 */
async function syncEvent(eventData) {
  console.log(`📅 Syncing event: ${eventData.title || eventData.id}`);

  // Transform data for Lark
  const statusMapping = {
    'draft': 'Draft',
    'active': 'Active',
    'published': 'Active',
    'sold_out': 'Sold Out',
    'completed': 'Completed',
    'cancelled': 'Completed'
  };

  const larkFields = {
    'SB ID': eventData.id,
    'Event Name': eventData.title || '',
    'Event Status': statusMapping[eventData.status] || 'Draft',
    'Ticket Price': eventData.ticket_price || 0,
    'Tickets Sold': eventData.tickets_sold || 0,
    'Active Promoters': eventData.active_promoters || 0,
    'Commission Rate': (eventData.base_commission_rate || 10) / 100,
    'Notes': eventData.description || ''
  };

  // Add date field if available
  if (eventData.event_date) {
    larkFields['Event Date'] = new Date(eventData.event_date).getTime();
  }

  // Auto-detect sold out status
  if (eventData.tickets_sold >= eventData.total_tickets) {
    larkFields['Event Status'] = 'Sold Out';
  }

  // Auto-detect completed status
  if (eventData.event_date) {
    const eventDate = new Date(eventData.event_date);
    const now = new Date();
    if (eventDate < now && larkFields['Event Status'] === 'Active') {
      larkFields['Event Status'] = 'Completed';
    }
  }

  try {
    // Check if record exists
    const searchResult = await mcp__lark_mcp__bitable_v1_appTableRecord_search({
      path: {
        app_token: LARK_CONFIG.appToken,
        table_id: LARK_CONFIG.tables.events
      },
      data: {
        filter: {
          conjunction: 'and',
          conditions: [{
            field_name: 'SB ID',
            operator: 'is',
            value: [eventData.id]
          }]
        },
        page_size: 1
      },
      useUAT: true
    });

    if (searchResult.items && searchResult.items.length > 0) {
      // Update existing record
      const recordId = searchResult.items[0].record_id;
      console.log(`🔄 Updating existing record: ${recordId}`);

      await mcp__lark_mcp__bitable_v1_appTableRecord_update({
        path: {
          app_token: LARK_CONFIG.appToken,
          table_id: LARK_CONFIG.tables.events,
          record_id: recordId
        },
        data: { fields: larkFields },
        useUAT: true
      });

      console.log(`✅ Updated event: ${eventData.title}`);
      return { action: 'updated', recordId };

    } else {
      // Create new record
      console.log(`➕ Creating new record`);

      const result = await mcp__lark_mcp__bitable_v1_appTableRecord_create({
        path: {
          app_token: LARK_CONFIG.appToken,
          table_id: LARK_CONFIG.tables.events
        },
        data: { fields: larkFields },
        useUAT: true
      });

      console.log(`✅ Created event: ${eventData.title}`);
      return { action: 'created', recordId: result.record.record_id };
    }

  } catch (error) {
    console.error(`❌ Error syncing event ${eventData.id}:`, error);
    throw error;
  }
}

/**
 * Sync all users from Supabase to Lark
 */
async function syncUsers() {
  console.log('🚀 Starting user sync...');

  const users = await extractRealUsers();
  const results = {
    processed: 0,
    created: 0,
    updated: 0,
    errors: 0
  };

  for (const user of users) {
    try {
      const result = await syncProfile(user);
      if (result.action === 'created') results.created++;
      if (result.action === 'updated') results.updated++;
      results.processed++;

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`❌ Error syncing user ${user.id}:`, error);
      results.errors++;
    }
  }

  console.log(`✅ User sync complete:`, results);
  return results;
}

/**
 * Sync all events from Supabase to Lark
 */
async function syncEvents() {
  console.log('🚀 Starting events sync...');

  const events = await extractRealEvents();
  const results = {
    processed: 0,
    created: 0,
    updated: 0,
    errors: 0
  };

  for (const event of events) {
    try {
      const result = await syncEvent(event);
      if (result.action === 'created') results.created++;
      if (result.action === 'updated') results.updated++;
      results.processed++;

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`❌ Error syncing event ${event.id}:`, error);
      results.errors++;
    }
  }

  console.log(`✅ Events sync complete:`, results);
  return results;
}

/**
 * Full sync of all data from Supabase to Lark
 */
async function syncAll() {
  console.log('🌟 Starting full Supabase to Lark sync...');

  const startTime = Date.now();

  try {
    const userResults = await syncUsers();
    const eventResults = await syncEvents();

    const totalResults = {
      users: userResults,
      events: eventResults,
      totalProcessed: userResults.processed + eventResults.processed,
      totalCreated: userResults.created + eventResults.created,
      totalUpdated: userResults.updated + eventResults.updated,
      totalErrors: userResults.errors + eventResults.errors,
      duration: Date.now() - startTime
    };

    console.log('🎉 Full sync complete:', totalResults);

    // Validate the sync
    const validation = await validateSync();
    totalResults.validation = validation;

    return totalResults;

  } catch (error) {
    console.error('💥 Full sync failed:', error);
    throw error;
  }
}

/**
 * Validate sync results
 */
async function validateSync() {
  console.log('🔍 Validating sync results...');

  try {
    // Check promoters with SB ID
    const promotersResult = await mcp__lark_mcp__bitable_v1_appTableRecord_search({
      path: {
        app_token: LARK_CONFIG.appToken,
        table_id: LARK_CONFIG.tables.promoters
      },
      data: {
        filter: {
          conjunction: 'and',
          conditions: [{
            field_name: 'SB ID',
            operator: 'isNotEmpty',
            value: []
          }]
        },
        page_size: 50
      },
      useUAT: true
    });

    // Check events with SB ID
    const eventsResult = await mcp__lark_mcp__bitable_v1_appTableRecord_search({
      path: {
        app_token: LARK_CONFIG.appToken,
        table_id: LARK_CONFIG.tables.events
      },
      data: {
        filter: {
          conjunction: 'and',
          conditions: [{
            field_name: 'SB ID',
            operator: 'isNotEmpty',
            value: []
          }]
        },
        page_size: 50
      },
      useUAT: true
    });

    const validation = {
      promotersWithSBID: promotersResult.total || 0,
      eventsWithSBID: eventsResult.total || 0,
      totalSynced: (promotersResult.total || 0) + (eventsResult.total || 0)
    };

    console.log('📊 Validation results:', validation);
    return validation;

  } catch (error) {
    console.error('❌ Validation failed:', error);
    throw error;
  }
}

// Export functions for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    syncAll,
    syncUsers,
    syncEvents,
    validateSync,
    syncProfile,
    syncEvent
  };
}

// Make functions globally available
if (typeof globalThis !== 'undefined') {
  globalThis.syncAll = syncAll;
  globalThis.syncUsers = syncUsers;
  globalThis.syncEvents = syncEvents;
  globalThis.validateSync = validateSync;
}

console.log('🎯 Supabase to Lark Sync Skill loaded!');
console.log('');
console.log('📋 Available Commands:');
console.log('• syncAll() - Full sync of all data (recommended)');
console.log('• syncUsers() - Sync users/promoters only');
console.log('• syncEvents() - Sync events only');
console.log('• validateSync() - Validate all synced data');
console.log('');
console.log('🚀 Quick start: Run syncAll() to sync everything');
console.log('');