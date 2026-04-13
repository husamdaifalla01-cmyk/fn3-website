#!/usr/bin/env node
// Seeds fn3_skill_versions with all agent skill files from /agents/

import { createClient } from "@supabase/supabase-js"
import { readFileSync, readdirSync } from "fs"
import { join, basename } from "path"
import { config } from "dotenv"

config({ path: join(process.cwd(), "orchestrator/.env") })

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in orchestrator/.env")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Map from file slug to agent_name in fn3_agent_registry
const AGENT_FILE_MAP = {
  // exec
  "exec/chief-of-staff": "hq-exec-chief-of-staff",
  "exec/cpo-agent": "hq-exec-cpo",
  "exec/cto-agent": "hq-exec-cto",
  "exec/cfo-agent": "hq-exec-cfo",
  "exec/strategy-agent": "hq-exec-strategy",
  // product (maps to subzii by default — duplicate for other ventures)
  "product/head-of-product": "subzii-product-head",
  "product/pm-agent": "subzii-product-pm",
  "product/roadmap-agent": "subzii-product-roadmap",
  "product/spec-writer": "subzii-product-spec-writer",
  "product/idea-validation": "subzii-product-idea-validation",
  // sales
  "sales/sales-director": "subzii-sales-director",
  "sales/pipeline-agent": "subzii-sales-pipeline",
  "sales/proposal-agent": "subzii-sales-proposal",
  "sales/followup-agent": "subzii-sales-followup",
  "sales/crm-agent": "subzii-sales-crm",
  // marketing
  "marketing/cmo-agent": "subzii-marketing-cmo",
  "marketing/content-agent": "subzii-marketing-content",
  "marketing/seo-agent": "subzii-marketing-seo",
  "marketing/social-agent": "subzii-marketing-social",
  "marketing/email-agent": "subzii-marketing-email",
  "marketing/copywriter-agent": "subzii-marketing-copywriter",
  // leadgen
  "leadgen/growth-lead": "subzii-leadgen-growth-lead",
  "leadgen/scraper-agent": "subzii-leadgen-scraper",
  "leadgen/qualifier-agent": "subzii-leadgen-qualifier",
  "leadgen/icp-matcher": "subzii-leadgen-icp-matcher",
  "leadgen/outreach-agent": "subzii-leadgen-outreach",
  // acquisition
  "acquisition/acquisition-director": "subzii-acquisition-director",
  "acquisition/paid-ads": "subzii-acquisition-paid-ads",
  "acquisition/funnel-agent": "subzii-acquisition-funnel",
  "acquisition/landing-page": "subzii-acquisition-landing-page",
  "acquisition/ab-test-agent": "subzii-acquisition-ab-test",
  // support
  "support/head-of-support": "subzii-support-head",
  "support/ticket-agent": "subzii-support-ticket",
  "support/faq-agent": "subzii-support-faq",
  "support/escalation-agent": "subzii-support-escalation",
  "support/churn-risk": "subzii-support-churn-risk",
  // legal
  "legal/general-counsel": "hq-legal-general-counsel",
  "legal/contract-agent": "hq-legal-contract",
  "legal/compliance-agent": "hq-legal-compliance",
  "legal/ip-agent": "hq-legal-ip",
  "legal/risk-agent": "hq-legal-risk",
  // qa
  "qa/qa-director": "platform-qa-director",
  "qa/output-validator": "platform-qa-output-validator",
  "qa/code-reviewer": "platform-qa-code-reviewer",
  "qa/brand-checker": "platform-qa-brand-checker",
  "qa/self-learning-gate": "platform-qa-self-learning-gate",
  // dev
  "dev/dev-lead": "platform-dev-lead",
  "dev/frontend-ui": "platform-dev-frontend-ui",
  "dev/react-codebase": "platform-dev-react-codebase",
  "dev/backend-agent": "platform-dev-backend",
  "dev/database-agent": "platform-dev-database",
  "dev/supabase-agent": "platform-dev-supabase",
  "dev/platform-qa": "platform-dev-platform-qa",
}

const agentArg = process.argv.includes("--agent")
  ? process.argv[process.argv.indexOf("--agent") + 1]
  : null

async function seedSkill(fileSlug, agentName) {
  const filePath = join(process.cwd(), "agents", fileSlug + ".md")

  let content
  try {
    content = readFileSync(filePath, "utf-8")
  } catch {
    console.warn(`⚠️  File not found: ${filePath} — skipping`)
    return
  }

  // Check if agent exists in registry
  const registryCheck = await supabase
    .from("fn3_agent_registry")
    .select("agent_name")
    .eq("agent_name", agentName)
    .maybeSingle()

  if (!registryCheck.data) {
    console.warn(`⚠️  Agent not in registry: ${agentName} — skipping`)
    return
  }

  // Get current max version for this agent
  const versionCheck = await supabase
    .from("fn3_skill_versions")
    .select("version")
    .eq("agent_name", agentName)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle()

  const nextVersion = (versionCheck.data?.version ?? 0) + 1

  // Deactivate current active version
  await supabase
    .from("fn3_skill_versions")
    .update({ is_active: false })
    .eq("agent_name", agentName)
    .eq("is_active", true)

  // Insert new version
  const insertResult = await supabase
    .from("fn3_skill_versions")
    .insert({
      agent_name: agentName,
      version: nextVersion,
      skill_content: content,
      is_active: true,
      deployed_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (insertResult.error) {
    console.error(`❌ Failed to seed ${agentName}: ${insertResult.error.message}`)
    return
  }

  // Update agent registry to point to new skill version
  await supabase
    .from("fn3_agent_registry")
    .update({ skill_version_id: insertResult.data.id })
    .eq("agent_name", agentName)

  console.log(`✅ Seeded ${agentName} → v${nextVersion}`)
}

async function main() {
  console.log("🚀 FN3 Skill Seeder starting...")

  if (agentArg) {
    // Seed single agent
    const entry = Object.entries(AGENT_FILE_MAP).find(([, name]) => name === agentArg)
    if (!entry) {
      console.error(`❌ Agent not found in map: ${agentArg}`)
      process.exit(1)
    }
    await seedSkill(entry[0], entry[1])
  } else {
    // Seed all agents
    for (const [fileSlug, agentName] of Object.entries(AGENT_FILE_MAP)) {
      await seedSkill(fileSlug, agentName)
    }
  }

  console.log("✅ Done!")
}

main().catch(err => {
  console.error("Fatal:", err)
  process.exit(1)
})
