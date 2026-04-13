export function getOnboardingPrompt(params: {
  role: string;
  state: string;
  date: string;
  size: string;
}) {
  return `Generate a comprehensive new employee onboarding plan for:
Role: ${params.role}
State: ${params.state}
Start date: ${params.date}
Company size: ${params.size}

Include:
- Day 1 checklist (equipment setup, accounts to create, meetings to schedule, people to meet)
- Week 1 goals and key activities
- 30-day milestones and success metrics
- 60-day milestones and success metrics
- 90-day milestones and success metrics
- Required federal forms: I-9 (Employment Eligibility Verification) and W-4 (Employee Withholding Certificate) with completion deadlines
- State-specific requirements for ${params.state} (state tax forms, any state-mandated training, specific labor law posters required, etc.)

Format each section clearly with headers and bullet points. Be specific and actionable.`;
}

export function getPolicyPrompt(params: {
  topic: string;
  companyName: string;
  industry: string;
  state: string;
  employeeCount: string;
}) {
  return `Write a professional employee handbook section on: ${params.topic}

Company: ${params.companyName}
Industry: ${params.industry}
State: ${params.state}
Number of employees: ${params.employeeCount}

Ensure compliance with federal law and ${params.state} state law.

Cover:
1. Purpose of the policy
2. Scope (who it applies to)
3. Policy details (comprehensive coverage of the topic)
4. Employee responsibilities
5. Manager/supervisor responsibilities
6. Consequences for policy violations
7. Acknowledgment statement

Write in professional, clear language that employees can understand. Avoid legalese but ensure it is legally sound. Reference relevant federal statutes (e.g., FMLA, ADA, Title VII) and ${params.state} state law where applicable.`;
}

export function getPerformanceReviewPrompt(params: {
  employeeName: string;
  role: string;
  period: string;
  rating: string;
  accomplishments: string;
  improvements: string;
}) {
  return `Write a performance review for:
Employee: ${params.employeeName}
Role: ${params.role}
Review Period: ${params.period}
Overall Rating: ${params.rating}/5
Key Accomplishments: ${params.accomplishments}
Areas for Improvement: ${params.improvements}

Requirements:
- Fair and objective in tone
- Specific with concrete examples where possible
- Legally defensible (avoid any language referencing protected classes: age, race, gender, religion, national origin, disability, pregnancy, etc.)
- Forward-looking and constructive
- No vague or subjective personality judgments

Structure:
1. Overall Performance Summary (2-3 sentences)
2. Key Strengths & Accomplishments (with the rating context)
3. Development Areas & Improvement Plan (specific, actionable)
4. Goals for Next Review Period (3-5 SMART goals)
5. Manager Comments section placeholder

Keep the tone professional, encouraging, and growth-oriented.`;
}

export function getJobDescriptionPrompt(params: {
  title: string;
  department: string;
  location: string;
  remote: string;
  salary: string;
  responsibilities: string;
}) {
  return `Write an EEOC-compliant job description for:
Title: ${params.title}
Department: ${params.department}
Location: ${params.location}
Remote/On-site: ${params.remote}
Salary Range: ${params.salary}
Key Responsibilities: ${params.responsibilities}

Format the job description as follows:
1. Job Summary (3-4 sentences describing the role and its impact)
2. Key Responsibilities (bulleted list, 6-10 items, action-verb led)
3. Required Qualifications (must-have skills and experience — 4-6 items)
4. Preferred Qualifications (nice-to-have — 3-4 items)
5. What We Offer (compensation, benefits, culture highlights)
6. EEO Statement (standard, legally compliant Equal Opportunity Employer statement)

Requirements:
- Do NOT include any requirements that could discriminate based on protected characteristics (age, race, gender, religion, national origin, disability, etc.)
- Focus on job-related skills and experience only
- Use inclusive language throughout
- Optimize wording for Indeed and LinkedIn job posting character limits
- Avoid jargon; be clear and specific`;
}

export function getTerminationPrompt(params: {
  employeeName: string;
  role: string;
  state: string;
  terminationType: string;
  lastDay: string;
  reason: string;
  salary: string;
}) {
  return `Generate termination documentation for:
Employee Name: ${params.employeeName}
Role: ${params.role}
State: ${params.state}
Termination Type: ${params.terminationType}
Last Day of Employment: ${params.lastDay}
Reason for Termination: ${params.reason}
Final Pay/Salary: ${params.salary}

Generate the following documents:

1. TERMINATION LETTER
- Professional, factual, non-emotional
- State the effective date clearly
- Reference any severance if applicable
- Avoid admissions of wrongdoing or promises

2. FINAL PAY CALCULATION SUMMARY
- Final paycheck timing per ${params.state} state law (deadline for final pay)
- Accrued/unused PTO payout (note ${params.state} law on this)
- Any outstanding expense reimbursements note

3. COBRA NOTICE SUMMARY
- Employee's right to continue health coverage under COBRA
- Timeline: employer must notify plan administrator within 30 days
- Employee has 60 days to elect COBRA coverage
- Duration of coverage available

4. STATE-SPECIFIC REQUIREMENTS FOR ${params.state}
- Any state-specific termination requirements
- Unemployment insurance notice requirements
- Any required separation documents

Note: Flag any items that require consultation with an employment attorney for this specific situation.`;
}

export const HR_QA_SYSTEM_PROMPT = `You are an HR compliance expert with deep knowledge of all 50 US states' employment laws, federal employment law (FLSA, FMLA, ADA, Title VII, ADEA, NLRA, WARN Act, etc.), and HR best practices.

When answering questions:
1. Provide accurate, specific answers with relevant statutes and regulations cited
2. Note state-specific nuances when the question involves jurisdiction-specific laws
3. Flag when the situation requires consulting a licensed employment attorney (complex cases, potential litigation, class action risk, etc.)
4. Be practical and actionable — give the person steps they can take
5. If a question is about termination, discipline, or sensitive HR matters, note documentation best practices
6. Never give advice that could expose the employer to legal liability if followed incorrectly

Format your responses clearly with headers when appropriate. Be thorough but concise.`;
