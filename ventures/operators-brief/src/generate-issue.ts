/**
 * The Operators Brief — Issue Generation Script
 *
 * Usage:
 *   npx ts-node src/generate-issue.ts --topic "How a logistics company automated freight quote processing"
 *   npx ts-node src/generate-issue.ts --topic "..." --publish
 *
 * Flags:
 *   --topic    Required. The case study topic.
 *   --industry Optional. Target industry (e.g. "logistics", "healthcare")
 *   --number   Optional. Issue number override. Defaults to auto-increment.
 *   --publish  Optional. If set, publishes draft to Beehiiv via API.
 *
 * Output:
 *   Saves to /content/issues/draft-[YYYY-MM-DD].json
 *   If --publish: creates a draft post in Beehiiv (not published, requires manual review)
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const ISSUE_SYSTEM_PROMPT = `You are the writer and researcher for The Operators Brief — a premium B2B newsletter that publishes AI implementation case studies with real ROI numbers.

Your writing standards:
- Every case study features a specific, realistic business (name anonymized) with specific operational context
- All numbers must be internally consistent and realistic — if you say 22 clients at $400/month, that's $8,800/month revenue
- The writing is serious, direct, and respects the reader's intelligence
- No hype language. No "game-changing" or "revolutionary." No AI enthusiasm. Just facts and analysis.
- Each section must be useful on its own — the reader who only reads "What Failed" gets value from just that section
- The Implementation Guide must be genuinely actionable, not generic advice
- The "What Failed" section is often the most valuable — document 2-3 specific failure modes with specifics

Tone: The Wall Street Journal operations desk, not TechCrunch. Serious practitioners writing for serious practitioners.

Output format: Valid JSON matching the exact schema provided in the user message. No markdown around the JSON.`;

interface IssueJSON {
  number: number;
  title: string;
  date: string;
  summary: string;
  case_study: string;
  implementation_guide: string;
  numbers: Record<string, unknown>;
  tool_stack: Array<{ tool: string; use: string; cost: string }>;
  what_failed: string;
  takeaway: string;
}

function getNextIssueNumber(): number {
  const issuesDir = path.join(__dirname, "../content/issues");
  const files = fs.readdirSync(issuesDir).filter((f) => f.match(/^issue-\d+\.json$/));
  if (files.length === 0) return 13;
  const numbers = files.map((f) => parseInt(f.match(/issue-(\d+)\.json/)![1], 10));
  return Math.max(...numbers) + 1;
}

function parseArgs(): { topic: string; industry?: string; number?: number; publish: boolean } {
  const args = process.argv.slice(2);
  let topic = "";
  let industry: string | undefined;
  let number: number | undefined;
  let publish = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--topic" && args[i + 1]) topic = args[++i];
    if (args[i] === "--industry" && args[i + 1]) industry = args[++i];
    if (args[i] === "--number" && args[i + 1]) number = parseInt(args[++i], 10);
    if (args[i] === "--publish") publish = true;
  }

  if (!topic) {
    console.error("Error: --topic is required");
    console.error("Usage: npx ts-node src/generate-issue.ts --topic 'Your case study topic'");
    process.exit(1);
  }

  return { topic, industry, number, publish };
}

async function generateIssue(
  topic: string,
  issueNumber: number,
  industry?: string
): Promise<IssueJSON> {
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const userPrompt = `Write a complete newsletter issue for The Operators Brief on this topic:

TOPIC: ${topic}
${industry ? `INDUSTRY FOCUS: ${industry}` : ""}
ISSUE NUMBER: ${issueNumber}
DATE: ${monthYear}

Generate a realistic, specific case study in this EXACT JSON format (return ONLY valid JSON, no markdown):

{
  "number": ${issueNumber},
  "title": "...",
  "date": "${monthYear}",
  "summary": "One paragraph, 2-3 sentences. Specific numbers. The kind of summary that makes an operator stop scrolling.",
  "case_study": "Full narrative case study. 600-900 words. Specific company (anonymized), specific context, specific problem, specific solution with technical detail. Include the business context (revenue, size, team), the problem they were solving, what they tried before, the specific system they built, and the outcome.",
  "implementation_guide": "Step-by-step guide to replicate this implementation. 7-10 specific steps. Not generic advice — the actual steps based on this specific case. Each step should be actionable with a timeframe estimate.",
  "numbers": {
    "key_before_metric": "value",
    "key_after_metric": "value",
    "implementation_cost": number,
    "monthly_tool_cost": number,
    "payback_period": "...",
    "annual_benefit": number,
    "roi_comment": "..."
  },
  "tool_stack": [
    {
      "tool": "Specific tool name with version/plan",
      "use": "Specific use case in this implementation",
      "cost": "Specific monthly cost at the volume described"
    }
  ],
  "what_failed": "2-3 specific failure modes from this implementation. What did they try first? What broke? What near-miss happened? What misconception did they have to unlearn? This is often the most valuable section — don't make it generic.",
  "takeaway": "1-2 sentences. The core insight that transfers to other businesses. Not a summary — an insight."
}

Requirements:
- All numbers must be internally consistent
- Tool costs must be realistic (check that tool pricing is plausible)
- The 'what_failed' section must be specific and instructive
- The implementation guide must be genuinely actionable for a technically capable operations team
- The case study must feel like a real company, not a hypothetical`;

  console.log(`Generating issue #${issueNumber}: "${topic}"...`);

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4000,
    system: ISSUE_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude API");
  }

  // Extract JSON from response (handle any leading/trailing text)
  let jsonText = content.text.trim();
  const jsonStart = jsonText.indexOf("{");
  const jsonEnd = jsonText.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1) {
    jsonText = jsonText.slice(jsonStart, jsonEnd + 1);
  }

  try {
    const issue = JSON.parse(jsonText) as IssueJSON;
    return issue;
  } catch (e) {
    console.error("Failed to parse JSON response from Claude");
    console.error("Raw response:", content.text.slice(0, 500));
    throw e;
  }
}

async function publishToBeehiiv(issue: IssueJSON): Promise<void> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.warn("BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID not set — skipping publish");
    return;
  }

  // Format issue as HTML for Beehiiv
  const body = `
<p><strong>Summary:</strong> ${issue.summary}</p>

<h2>The Case Study</h2>
${issue.case_study.split("\n\n").map((p) => `<p>${p}</p>`).join("")}

<h2>The Numbers</h2>
<table>
${Object.entries(issue.numbers)
  .filter(([k]) => k !== "roi_comment")
  .map(([k, v]) => `<tr><td>${k.replace(/_/g, " ")}</td><td><strong>${v}</strong></td></tr>`)
  .join("")}
</table>
${issue.numbers.roi_comment ? `<p><em>${issue.numbers.roi_comment}</em></p>` : ""}

<h2>Implementation Guide</h2>
${issue.implementation_guide.split("\n\n").map((p) => `<p>${p}</p>`).join("")}

<h2>Tool Stack Used</h2>
<ul>
${issue.tool_stack
  .map(
    (t) =>
      `<li><strong>${t.tool}</strong> — ${t.use} <em>(${t.cost})</em></li>`
  )
  .join("")}
</ul>

<h2>What Failed First</h2>
${issue.what_failed.split("\n\n").map((p) => `<p>${p}</p>`).join("")}

<h2>The Takeaway</h2>
<p><em>${issue.takeaway}</em></p>
`;

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/posts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `Issue #${issue.number}: ${issue.title}`,
        subtitle: issue.summary.slice(0, 200),
        body,
        status: "draft", // Always draft — human reviews before publishing
        audience: "all",
        content_tags: ["case-study", "ai-implementation"],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Beehiiv API error: ${response.status} — ${error}`);
  }

  const data = (await response.json()) as { data?: { id?: string } };
  console.log(`Published draft to Beehiiv. Post ID: ${data?.data?.id || "unknown"}`);
  console.log("Go to Beehiiv dashboard to review and schedule the post.");
}

async function main() {
  const { topic, industry, number, publish } = parseArgs();

  const issueNumber = number ?? getNextIssueNumber();
  const issue = await generateIssue(topic, issueNumber, industry);

  // Save to file
  const today = new Date().toISOString().slice(0, 10);
  const filename = `draft-${today}.json`;
  const outputPath = path.join(__dirname, "../content/issues", filename);

  fs.writeFileSync(outputPath, JSON.stringify(issue, null, 2));
  console.log(`\nSaved draft to: ${outputPath}`);

  // Display key numbers
  console.log("\n--- Issue Summary ---");
  console.log(`Title: ${issue.title}`);
  console.log(`Summary: ${issue.summary.slice(0, 150)}...`);
  console.log(`Tools: ${issue.tool_stack.map((t) => t.tool).join(", ")}`);
  console.log("---------------------\n");

  // Publish to Beehiiv if requested
  if (publish) {
    await publishToBeehiiv(issue);
  } else {
    console.log("To publish to Beehiiv as a draft, run with --publish flag.");
  }

  console.log("Done. Review the draft, edit as needed, then publish.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
