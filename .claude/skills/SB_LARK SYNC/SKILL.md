# Supabase to Lark Sync

**Name:** supabase-lark-sync
**Description:** Regular scheduled sync of events and promoters from Supabase to Lark Base

## Overview

This skill provides automated synchronization between your Supabase database and Lark Base tables. It extracts real user and event data from Supabase and syncs them to the corresponding Lark Base tables with UPSERT logic (create if new, update if exists).

## Features

- ✅ **Real Data Extraction**: Pulls live user and event data from Supabase
- ✅ **UPSERT Logic**: Creates new records or updates existing ones based on SB ID
- ✅ **Rate Limiting**: Built-in delays to respect API limits
- ✅ **Comprehensive Logging**: Detailed console output for monitoring
- ✅ **Validation**: Built-in sync validation and reporting
- ✅ **Error Handling**: Robust error handling with detailed reporting

## Available Functions

### Main Commands
- `syncAll()` - Full sync of all data (users + events) - **Recommended**
- `syncUsers()` - Sync users/promoters only
- `syncEvents()` - Sync events only
- `validateSync()` - Validate all synced data

### Advanced Functions
- `syncProfile(profileData)` - Sync individual profile
- `syncEvent(eventData)` - Sync individual event

## Usage

```javascript
// Full sync (recommended for regular use)
const results = await syncAll();

// Users only
const userResults = await syncUsers();

// Events only
const eventResults = await syncEvents();

// Validation
const validation = await validateSync();
```

## Data Mapping

### Users → Promoters Table
- `id` → `SB ID` (Primary key for matching)
- `full_name` → `Promoter Name`
- `account_type` → `Status` (Active/Pending Review)
- `created_at` → `Joined Date`
- Commission fields (defaulted to 0 for now)

### Events → Events Table
- `id` → `SB ID` (Primary key for matching)
- `title` → `Event Name`
- `status` → `Event Status` (Draft/Active/Completed/Sold Out)
- `ticket_price` → `Ticket Price`
- `tickets_sold` → `Tickets Sold`
- `event_date` → `Event Date`
- `description` → `Notes`

## Scheduling

For regular automated syncing, you can:

1. **Manual**: Run `syncAll()` in Claude Code when needed
2. **Cron**: Set up a cron job to call this script
3. **CI/CD**: Integrate into your deployment pipeline

## Configuration

The skill is pre-configured with:
- **Lark App Token**: W1iEbORCia4NC4shfCZjkIyXpUh
- **Promoters Table ID**: tbl7s9VVAep6Zzyk
- **Events Table ID**: tblZDb8ara1auYLM
- **Supabase URL**: https://amcqlvpejznkyyrjaoos.supabase.co

## Example Output

```
🚀 Starting full Supabase to Lark sync...
👥 Extracting real users from Supabase...
✅ Extracted 9 users
📝 Syncing profile: HotStuff
🔄 Updating existing record: recvbtMb32g8IX
✅ Updated profile: HotStuff
📅 Extracting real events from Supabase...
✅ Extracted 4 events
📅 Syncing event: Subzii Launch
✅ Updated event: Subzii Launch
🎉 Full sync complete: {users: {processed: 9, updated: 9}, events: {processed: 4, updated: 4}}
```

## Error Handling

The skill includes comprehensive error handling:
- Network timeouts and retries
- API rate limiting
- Data validation
- Detailed error reporting

All errors are logged with context for easy debugging.