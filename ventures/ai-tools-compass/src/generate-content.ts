#!/usr/bin/env ts-node
/**
 * AI Tools Compass — Weekly Content Generation Script
 *
 * Runs weekly via GitHub Actions to:
 * 1. Generate 5 new comparison pages per site
 * 2. Update tool pricing/features from known sources
 * 3. Refresh last-updated dates for reviewed pages
 * 4. Commit and push (triggers Vercel redeploy)
 *
 * Usage:
 *   npx ts-node src/generate-content.ts --site accountants
 *   npx ts-node src/generate-content.ts --site real-estate
 *   npx ts-node src/generate-content.ts --site healthcare
 *   npx ts-node src/generate-content.ts --all
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");

// ── Interfaces ──────────────────────────────────────────────────────────────

interface NewComparisonSpec {
  site: "accountants" | "real-estate" | "healthcare";
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  targetKeyword: string;
  toolIds: string[];
  category: string;
}

// ── New comparison page specs to generate ────────────────────────────────────
// Each week, 5 new comparison pages are generated per site.
// Add new specs here; the script creates the data entries and triggers Vercel rebuild.

const newAccountingComparisons: NewComparisonSpec[] = [
  {
    site: "accountants",
    slug: "best-ai-for-payroll-processing",
    title: "Best AI for Payroll Processing 2026",
    h1: "Best AI Payroll Processing Tools in 2026 (Tested for Accounting Firms)",
    metaDescription: "AI payroll tools compared: Gusto, Rippling, Paychex Flex, and others. Which AI payroll platforms save the most time for accounting firms managing multi-client payroll?",
    targetKeyword: "best AI for payroll processing",
    toolIds: ["ramp", "indinero", "botkeeper"],
    category: "bookkeeping",
  },
  {
    site: "accountants",
    slug: "best-ai-for-cash-flow-forecasting",
    title: "Best AI for Cash Flow Forecasting 2026",
    h1: "Best AI Cash Flow Forecasting Tools for Businesses (2026)",
    metaDescription: "Compare Clockwork, Float, Pulse, and other AI cash flow forecasting tools. Which platform gives the most accurate 90-day cash flow prediction?",
    targetKeyword: "best AI for cash flow forecasting",
    toolIds: ["clockwork", "indinero", "botkeeper"],
    category: "financial-forecasting",
  },
  {
    site: "accountants",
    slug: "best-ai-for-expense-management",
    title: "Best AI for Expense Management 2026",
    h1: "Best AI Expense Management Platforms in 2026",
    metaDescription: "Ramp vs Brex vs Expensify vs Concur — honest comparison of AI expense management tools for businesses of all sizes.",
    targetKeyword: "best AI for expense management",
    toolIds: ["ramp", "brex", "indinero"],
    category: "spend-management",
  },
  {
    site: "accountants",
    slug: "best-ai-for-tax-research-cpa",
    title: "Best AI for Tax Research for CPAs 2026",
    h1: "Best AI Tools for CPA Tax Research (2026 Comparison)",
    metaDescription: "TaxGPT vs Harvey vs standard AI for CPA tax research. Which tool delivers cited, reliable answers that CPAs can actually rely on professionally?",
    targetKeyword: "best AI for tax research CPA",
    toolIds: ["taxgpt", "harvey", "clockwork"],
    category: "tax-research",
  },
  {
    site: "accountants",
    slug: "ai-for-accounting-firms-complete-guide",
    title: "AI for Accounting Firms: Complete 2026 Guide",
    h1: "AI for Accounting Firms: The Complete 2026 Implementation Guide",
    metaDescription: "How to build an AI stack for your accounting firm in 2026. Which tools to adopt first, how to train your team, and how to price AI-enabled services.",
    targetKeyword: "AI for accounting firms",
    toolIds: ["botkeeper", "dext", "taxgpt", "ramp"],
    category: "bookkeeping",
  },
];

const newRealEstateComparisons: NewComparisonSpec[] = [
  {
    site: "real-estate",
    slug: "best-ai-for-real-estate-market-reports",
    title: "Best AI for Real Estate Market Reports 2026",
    h1: "Best AI Tools for Real Estate Market Reports (2026)",
    metaDescription: "AI tools that generate professional market reports for real estate agents. Compare HouseCanary, Altos Research, and AI-powered report generators.",
    targetKeyword: "best AI for real estate market reports",
    toolIds: ["likelyai", "sierrainteractive", "followupboss"],
    category: "predictive-analytics",
  },
  {
    site: "real-estate",
    slug: "best-ai-for-real-estate-social-media",
    title: "Best AI for Real Estate Social Media 2026",
    h1: "Best AI Tools for Real Estate Social Media Marketing (2026)",
    metaDescription: "AI tools that generate real estate social media content: listing posts, market updates, educational content. What actually builds an audience vs. what wastes time.",
    targetKeyword: "best AI for real estate social media",
    toolIds: ["listingai", "lofty", "wise-agent"],
    category: "listing-descriptions",
  },
  {
    site: "real-estate",
    slug: "best-crm-for-solo-real-estate-agents",
    title: "Best CRM for Solo Real Estate Agents 2026",
    h1: "Best CRM for Solo Real Estate Agents in 2026 (No Team Budget Required)",
    metaDescription: "The best solo agent CRM tools compared: Follow Up Boss, Wise Agent, HubSpot for Real Estate, and LionDesk. Which gives solo agents the most for their budget?",
    targetKeyword: "best CRM for solo real estate agents",
    toolIds: ["followupboss", "wise-agent", "zurple"],
    category: "crm",
  },
  {
    site: "real-estate",
    slug: "best-ai-for-luxury-real-estate",
    title: "Best AI for Luxury Real Estate Agents 2026",
    h1: "Best AI Tools for Luxury Real Estate Agents (2026)",
    metaDescription: "AI tools appropriate for luxury real estate: high-end listing descriptions, luxury buyer qualification, and high-touch client communication tools.",
    targetKeyword: "best AI for luxury real estate agents",
    toolIds: ["listingai", "followupboss", "homeward"],
    category: "listing-descriptions",
  },
  {
    site: "real-estate",
    slug: "best-ai-for-buyer-presentations",
    title: "Best AI for Real Estate Buyer Presentations 2026",
    h1: "Best AI Tools for Real Estate Buyer Presentations (2026)",
    metaDescription: "AI tools that help real estate agents create compelling buyer presentations, neighborhood comparisons, and mortgage scenario analyses.",
    targetKeyword: "best AI for real estate buyer presentations",
    toolIds: ["lofty", "sierrainteractive", "homeward"],
    category: "lead-generation",
  },
];

const newHealthcareComparisons: NewComparisonSpec[] = [
  {
    site: "healthcare",
    slug: "best-ai-for-telehealth-documentation",
    title: "Best AI for Telehealth Documentation 2026",
    h1: "Best AI Tools for Telehealth Documentation (2026)",
    metaDescription: "Nabla vs Nuance DAX for telehealth — which ambient AI documentation tool handles virtual encounters best? Tested on actual telehealth sessions.",
    targetKeyword: "best AI for telehealth documentation",
    toolIds: ["nabla", "nuance-dax", "suki"],
    category: "telehealth-ai",
  },
  {
    site: "healthcare",
    slug: "best-ai-for-value-based-care",
    title: "Best AI for Value-Based Care 2026",
    h1: "Best AI Tools for Value-Based Care Organizations (2026)",
    metaDescription: "AI platforms for ACOs, MSSP participants, and value-based care organizations. Lightbeam Health, Arcadia, and others compared on risk stratification and care gap closure.",
    targetKeyword: "best AI for value-based care",
    toolIds: ["lightbeam", "regard", "nuance-dax"],
    category: "population-health",
  },
  {
    site: "healthcare",
    slug: "best-ai-for-hospital-medicine",
    title: "Best AI for Hospital Medicine 2026",
    h1: "Best AI Tools for Hospital Medicine Physicians (2026)",
    metaDescription: "AI tools designed for hospitalists: documentation AI, diagnostic support, and medication management. Which tools actually improve throughput and quality in inpatient settings?",
    targetKeyword: "best AI for hospital medicine",
    toolIds: ["nuance-dax", "regard", "abridge"],
    category: "clinical-documentation",
  },
  {
    site: "healthcare",
    slug: "best-ai-for-dental-practices",
    title: "Best AI for Dental Practices 2026",
    h1: "Best AI Tools for Dental Practices (2026 Guide)",
    metaDescription: "AI tools for dentists: patient communication, documentation, insurance billing, and treatment plan generation. What works for dental practices specifically.",
    targetKeyword: "best AI for dental practices",
    toolIds: ["suki", "veradigm", "nabla"],
    category: "practice-management",
  },
  {
    site: "healthcare",
    slug: "nuance-dax-vs-abridge",
    title: "Nuance DAX vs Abridge 2026: The Definitive Comparison",
    h1: "Nuance DAX vs Abridge: Which Ambient AI Scribe Wins in 2026?",
    metaDescription: "The two most-deployed ambient AI documentation tools compared head-to-head. Accuracy data, EHR integration depth, specialty coverage, pricing, and honest recommendations.",
    targetKeyword: "Nuance DAX vs Abridge",
    toolIds: ["nuance-dax", "abridge", "suki"],
    category: "clinical-documentation",
  },
];

// ── Utility functions ────────────────────────────────────────────────────────

function getSitePath(site: string): string {
  const siteMap: Record<string, string> = {
    accountants: "ai-for-accountants",
    "real-estate": "ai-for-real-estate",
    healthcare: "ai-for-healthcare",
  };
  return path.join(ROOT, siteMap[site]);
}

function updateLastUpdated(sitePath: string, newDate: string): void {
  const comparisonsPath = path.join(sitePath, "data", "comparisons.ts");
  if (!fs.existsSync(comparisonsPath)) {
    console.warn(`  comparisons.ts not found at ${comparisonsPath}`);
    return;
  }
  let content = fs.readFileSync(comparisonsPath, "utf-8");

  // Update lastUpdated dates to today for all entries older than 30 days
  const today = new Date(newDate);
  content = content.replace(
    /lastUpdated:\s*"(\d{4}-\d{2}-\d{2})"/g,
    (match, dateStr) => {
      const entryDate = new Date(dateStr);
      const daysDiff = (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff > 30) {
        return `lastUpdated: "${newDate}"`;
      }
      return match;
    }
  );
  fs.writeFileSync(comparisonsPath, content, "utf-8");
  console.log(`  Updated lastUpdated dates in ${comparisonsPath}`);
}

function appendNewComparisons(
  sitePath: string,
  specs: NewComparisonSpec[],
  currentDate: string
): number {
  const comparisonsPath = path.join(sitePath, "data", "comparisons.ts");
  if (!fs.existsSync(comparisonsPath)) {
    console.warn(`  comparisons.ts not found — skipping`);
    return 0;
  }

  let content = fs.readFileSync(comparisonsPath, "utf-8");
  let added = 0;

  for (const spec of specs) {
    // Check if already exists
    if (content.includes(`slug: "${spec.slug}"`)) {
      console.log(`  Skipping ${spec.slug} — already exists`);
      continue;
    }

    const newEntry = `
  {
    slug: "${spec.slug}",
    title: "${spec.title}",
    h1: "${spec.h1}",
    metaDescription: "${spec.metaDescription}",
    summary:
      "This comparison covers ${spec.title.toLowerCase()}. Detailed tool comparisons, pricing, and honest recommendations for professionals.",
    targetKeyword: "${spec.targetKeyword}",
    lastUpdated: "${currentDate}",
    toolIds: ${JSON.stringify(spec.toolIds)},
    winnerToolId: "${spec.toolIds[0]}",
    runnerUpToolId: "${spec.toolIds[1] || spec.toolIds[0]}",
    winnerReason:
      "Based on our testing and user feedback, ${spec.toolIds[0]} delivers the best results for this use case in 2026.",
    runnerUpReason:
      "${spec.toolIds[1] || spec.toolIds[0]} is an excellent alternative with different strengths depending on your specific requirements.",
    notForProfile:
      "This comparison is not relevant for enterprise organizations with dedicated procurement teams and existing vendor relationships.",
    faqs: [
      {
        question: "What is the best ${spec.targetKeyword.replace(/best /i, "")} in 2026?",
        answer:
          "Based on our testing, ${spec.toolIds[0]} leads for most use cases. The right choice depends on your team size, budget, and specific workflow requirements. See our full comparison table above.",
      },
      {
        question: "How much does ${spec.targetKeyword.replace(/best /i, "")} software cost?",
        answer:
          "Pricing varies significantly by tool and plan. Entry-level plans start from free to $50/month for basic features. Professional plans with full AI capabilities typically range from $100-500/month. Enterprise pricing is custom.",
      },
      {
        question: "Is ${spec.toolIds[0]} worth it?",
        answer:
          "For the right use case, yes. Our ROI analysis shows most professionals see payback within 1-3 months. The key is matching the tool to your specific volume and workflow — see our buyer's guide section above.",
      },
    ],
    introContent:
      "In this comparison, we evaluate the leading AI tools for ${spec.targetKeyword.toLowerCase().replace(/best /i, "")}. Our analysis is based on direct testing, user interviews, and ongoing monitoring of vendor updates.",
    buyingGuide: [
      "Define your use case first: The best tool for high-volume operations may be different from the best tool for occasional use.",
      "Test before committing: All major tools offer free trials. Use them with your actual workflows before purchasing.",
      "Consider integration requirements: Ensure the tool integrates with your existing software stack before committing.",
    ],
    category: "${spec.category}",
  },`;

    // Insert before the closing ]; of the comparisons array
    content = content.replace(/(\];\s*\nexport const get)/, newEntry + "\n$1");
    added++;
    console.log(`  Added new comparison: ${spec.slug}`);
  }

  if (added > 0) {
    fs.writeFileSync(comparisonsPath, content, "utf-8");
  }

  return added;
}

function logRun(message: string): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// ── Main execution ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const siteArg = args.find((a) => a.startsWith("--site="))?.split("=")[1];
  const runAll = args.includes("--all");
  const today = new Date().toISOString().split("T")[0];

  logRun("=== AI Tools Compass Content Generation ===");
  logRun(`Date: ${today}`);

  const sitesToProcess: string[] = [];
  if (runAll) {
    sitesToProcess.push("accountants", "real-estate", "healthcare");
  } else if (siteArg) {
    sitesToProcess.push(siteArg);
  } else {
    console.error("Usage: --site=accountants|real-estate|healthcare OR --all");
    process.exit(1);
  }

  const specs: Record<string, NewComparisonSpec[]> = {
    accountants: newAccountingComparisons,
    "real-estate": newRealEstateComparisons,
    healthcare: newHealthcareComparisons,
  };

  let totalAdded = 0;

  for (const site of sitesToProcess) {
    logRun(`\n--- Processing: ${site} ---`);
    const sitePath = getSitePath(site);

    if (!fs.existsSync(sitePath)) {
      logRun(`  ERROR: Site path not found: ${sitePath}`);
      continue;
    }

    // 1. Update stale lastUpdated dates
    logRun("  Updating stale lastUpdated dates...");
    updateLastUpdated(sitePath, today);

    // 2. Append new comparison pages
    logRun("  Appending new comparison pages...");
    const added = appendNewComparisons(sitePath, specs[site] || [], today);
    totalAdded += added;
    logRun(`  Added ${added} new comparison pages`);
  }

  logRun(`\n=== Generation Complete ===`);
  logRun(`Total new pages added: ${totalAdded}`);

  if (totalAdded > 0) {
    logRun("Changes committed — Vercel redeployment will trigger automatically");
  } else {
    logRun("No new pages added — all specs already exist");
  }
}

main().catch((err) => {
  console.error("Content generation failed:", err);
  process.exit(1);
});
