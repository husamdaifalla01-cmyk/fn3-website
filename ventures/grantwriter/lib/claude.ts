// lib/claude.ts — All Claude prompts and lazy-init client factory
// IMPORTANT: Client is NEVER initialized at module level

export function getAnthropicClient() {
  const Anthropic = require("@anthropic-ai/sdk").default;
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

export interface NarrativeInput {
  orgName: string;
  mission: string;
  programName: string;
  programDesc: string;
  targetPop: string;
  geography: string;
  amount: string;
  grantType: "federal" | "foundation" | "corporate" | "government";
  funderName: string;
  funderPriorities: string;
}

export interface BudgetJustificationInput {
  orgName: string;
  budgetItems: string;
  totalAmount: string;
  grantType: string;
  funderName: string;
}

export interface ExecutiveSummaryInput {
  orgName: string;
  mission: string;
  programName: string;
  programDesc: string;
  targetPop: string;
  geography: string;
  amount: string;
  grantType: string;
  funderName: string;
  goals: string;
}

export interface RevisionInput {
  sectionName: string;
  currentText: string;
  feedback: string;
  requirements: string;
}

export function buildNarrativePrompt(input: NarrativeInput): string {
  const tone =
    input.grantType === "federal"
      ? "formal, evidence-based, cite published research"
      : "compelling, community-centered, storytelling-forward";

  return `Write a compelling grant narrative for this proposal:
Organization: ${input.orgName}
Mission: ${input.mission}
Program: ${input.programName}
Program description: ${input.programDesc}
Target population: ${input.targetPop}
Geographic area: ${input.geography}
Funding amount requested: ${input.amount}
Grant type: ${input.grantType} (federal/foundation/corporate/government)
Funder name: ${input.funderName}
Funder priorities: ${input.funderPriorities}

Write: Statement of Need (data-driven, local statistics), Program Description (activities, timeline, staffing), Goals and Objectives (SMART format, 3 goals with 2-3 measurable objectives each), Evaluation Plan (process and outcome measures, data collection methods).

Tone: ${tone}
Length: approximately 2,000 words.`;
}

export function buildBudgetJustificationPrompt(
  input: BudgetJustificationInput
): string {
  return `Write a line-by-line budget justification for this grant:
Organization: ${input.orgName}
Budget items: ${input.budgetItems}
Total requested: ${input.totalAmount}
Grant type: ${input.grantType}
Funder: ${input.funderName}

For each budget line: explain why the expense is necessary, how the amount was calculated, what portion is grant-funded vs. match, and what impact this line item enables. Use funder language.`;
}

export function buildExecutiveSummaryPrompt(
  input: ExecutiveSummaryInput
): string {
  return `Write a compelling executive summary (300-400 words) for this grant application:
Organization: ${input.orgName}
Mission: ${input.mission}
Program: ${input.programName}
Program description: ${input.programDesc}
Target population: ${input.targetPop}
Geographic area: ${input.geography}
Funding amount requested: ${input.amount}
Grant type: ${input.grantType}
Funder: ${input.funderName}
Key goals: ${input.goals}

The executive summary should open with a compelling hook, clearly state the problem, describe the proposed solution, outline expected outcomes, and end with a call to action. Tailor the language and emphasis to the funder type.`;
}

export function buildRevisionPrompt(input: RevisionInput): string {
  return `You are reviewing grant narrative feedback and rewriting the specified section.
Section to revise: ${input.sectionName}
Current text: ${input.currentText}
Reviewer feedback: ${input.feedback}
Funder requirements: ${input.requirements}

Rewrite the section addressing all reviewer concerns while maintaining the original program description and organizational voice.`;
}
