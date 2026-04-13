"use strict";(()=>{var e={};e.id=297,e.ids=[297],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},7561:e=>{e.exports=require("node:fs")},4492:e=>{e.exports=require("node:stream")},2477:e=>{e.exports=require("node:stream/web")},1017:e=>{e.exports=require("path")},5477:e=>{e.exports=require("punycode")},2781:e=>{e.exports=require("stream")},7310:e=>{e.exports=require("url")},3837:e=>{e.exports=require("util")},1267:e=>{e.exports=require("worker_threads")},9796:e=>{e.exports=require("zlib")},7034:(e,t,i)=>{i.r(t),i.d(t,{originalPathname:()=>y,patchFetch:()=>g,requestAsyncStorage:()=>u,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>d});var a={};i.r(a),i.d(a,{POST:()=>c});var n=i(9303),r=i(8716),o=i(670),s=i(7070),l=i(8027);async function c(e){try{let{topic:t,companyName:a,industry:n,state:r,employeeCount:o}=await e.json();if(!t||!a||!n||!r||!o)return s.NextResponse.json({error:"Missing required fields"},{status:400});let c=new(await i.e(966).then(i.bind(i,3966))).default({apiKey:process.env.ANTHROPIC_API_KEY}),p=(0,l.Xg)({topic:t,companyName:a,industry:n,state:r,employeeCount:o}),u=(await c.messages.create({model:"claude-sonnet-4-6",max_tokens:2048,messages:[{role:"user",content:p}]})).content[0];if("text"!==u.type)throw Error("Unexpected response type from Claude");return s.NextResponse.json({result:u.text})}catch(e){return console.error("Error generating policy:",e),s.NextResponse.json({error:"Failed to generate policy"},{status:500})}}let p=new n.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/generate-policy/route",pathname:"/api/generate-policy",filename:"route",bundlePath:"app/api/generate-policy/route"},resolvedPagePath:"/Users/husamahmed/FN3/ventures/hrmind/app/api/generate-policy/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:u,staticGenerationAsyncStorage:d,serverHooks:m}=p,y="/api/generate-policy/route";function g(){return(0,o.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:d})}},8027:(e,t,i)=>{function a(e){return`Generate a comprehensive new employee onboarding plan for:
Role: ${e.role}
State: ${e.state}
Start date: ${e.date}
Company size: ${e.size}

Include:
- Day 1 checklist (equipment setup, accounts to create, meetings to schedule, people to meet)
- Week 1 goals and key activities
- 30-day milestones and success metrics
- 60-day milestones and success metrics
- 90-day milestones and success metrics
- Required federal forms: I-9 (Employment Eligibility Verification) and W-4 (Employee Withholding Certificate) with completion deadlines
- State-specific requirements for ${e.state} (state tax forms, any state-mandated training, specific labor law posters required, etc.)

Format each section clearly with headers and bullet points. Be specific and actionable.`}function n(e){return`Write a professional employee handbook section on: ${e.topic}

Company: ${e.companyName}
Industry: ${e.industry}
State: ${e.state}
Number of employees: ${e.employeeCount}

Ensure compliance with federal law and ${e.state} state law.

Cover:
1. Purpose of the policy
2. Scope (who it applies to)
3. Policy details (comprehensive coverage of the topic)
4. Employee responsibilities
5. Manager/supervisor responsibilities
6. Consequences for policy violations
7. Acknowledgment statement

Write in professional, clear language that employees can understand. Avoid legalese but ensure it is legally sound. Reference relevant federal statutes (e.g., FMLA, ADA, Title VII) and ${e.state} state law where applicable.`}function r(e){return`Write a performance review for:
Employee: ${e.employeeName}
Role: ${e.role}
Review Period: ${e.period}
Overall Rating: ${e.rating}/5
Key Accomplishments: ${e.accomplishments}
Areas for Improvement: ${e.improvements}

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

Keep the tone professional, encouraging, and growth-oriented.`}function o(e){return`Write an EEOC-compliant job description for:
Title: ${e.title}
Department: ${e.department}
Location: ${e.location}
Remote/On-site: ${e.remote}
Salary Range: ${e.salary}
Key Responsibilities: ${e.responsibilities}

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
- Avoid jargon; be clear and specific`}function s(e){return`Generate termination documentation for:
Employee Name: ${e.employeeName}
Role: ${e.role}
State: ${e.state}
Termination Type: ${e.terminationType}
Last Day of Employment: ${e.lastDay}
Reason for Termination: ${e.reason}
Final Pay/Salary: ${e.salary}

Generate the following documents:

1. TERMINATION LETTER
- Professional, factual, non-emotional
- State the effective date clearly
- Reference any severance if applicable
- Avoid admissions of wrongdoing or promises

2. FINAL PAY CALCULATION SUMMARY
- Final paycheck timing per ${e.state} state law (deadline for final pay)
- Accrued/unused PTO payout (note ${e.state} law on this)
- Any outstanding expense reimbursements note

3. COBRA NOTICE SUMMARY
- Employee's right to continue health coverage under COBRA
- Timeline: employer must notify plan administrator within 30 days
- Employee has 60 days to elect COBRA coverage
- Duration of coverage available

4. STATE-SPECIFIC REQUIREMENTS FOR ${e.state}
- Any state-specific termination requirements
- Unemployment insurance notice requirements
- Any required separation documents

Note: Flag any items that require consultation with an employment attorney for this specific situation.`}i.d(t,{Cd:()=>r,MM:()=>a,Xg:()=>n,ec:()=>l,he:()=>s,rk:()=>o});let l=`You are an HR compliance expert with deep knowledge of all 50 US states' employment laws, federal employment law (FLSA, FMLA, ADA, Title VII, ADEA, NLRA, WARN Act, etc.), and HR best practices.

When answering questions:
1. Provide accurate, specific answers with relevant statutes and regulations cited
2. Note state-specific nuances when the question involves jurisdiction-specific laws
3. Flag when the situation requires consulting a licensed employment attorney (complex cases, potential litigation, class action risk, etc.)
4. Be practical and actionable — give the person steps they can take
5. If a question is about termination, discipline, or sensitive HR matters, note documentation best practices
6. Never give advice that could expose the employer to legal liability if followed incorrectly

Format your responses clearly with headers when appropriate. Be thorough but concise.`}};var t=require("../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),a=t.X(0,[948,972],()=>i(7034));module.exports=a})();