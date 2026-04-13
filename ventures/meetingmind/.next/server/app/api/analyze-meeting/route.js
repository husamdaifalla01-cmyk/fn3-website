"use strict";(()=>{var e={};e.id=938,e.ids=[938],e.modules={4675:e=>{e.exports=require("@anthropic-ai/sdk")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},140:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>h,patchFetch:()=>g,requestAsyncStorage:()=>m,routeModule:()=>l,serverHooks:()=>u,staticGenerationAsyncStorage:()=>p});var n={};a.r(n),a.d(n,{POST:()=>d});var r=a(9303),i=a(8716),s=a(670),o=a(7070);let c=`You are an expert meeting analyst. Analyze the meeting transcript and extract:

1. SUMMARY (3-5 sentences): What the meeting was about, what was decided, what happens next.

2. ACTION ITEMS: Every task mentioned. Format as JSON array:
[{ "task": "specific action", "owner": "person name or 'Unassigned'", "deadline": "date or 'No deadline set'", "priority": "high|medium|low" }]

3. DECISIONS: Every decision made. Format as JSON array:
[{ "decision": "what was decided", "context": "why or what led to this decision" }]

4. FOLLOW_UP_EMAIL: A ready-to-send follow-up email to all attendees. Include:
- Subject line
- Opening: thanks for attending, brief meeting context
- Key decisions section
- Action items with owners and deadlines
- Next meeting date if mentioned
- Professional sign-off

Be specific. Use names from the transcript when assigning action items. If a deadline isn't explicit, mark it as unset rather than guessing.`;async function d(e){try{let{transcript:t,title:n,participants:r}=await e.json();if(!t||0===t.trim().length)return o.NextResponse.json({error:"Transcript is required"},{status:400});let i=new(await Promise.resolve().then(a.t.bind(a,4675,23))).default({apiKey:process.env.ANTHROPIC_API_KEY}),s=r&&r.length>0?`

Known participants: ${r.join(", ")}`:"",d=n?`

Meeting title: ${n}`:"",l=`${d}${s}

MEETING TRANSCRIPT:
${t}

Please analyze this transcript and return your response in the following exact format:

SUMMARY:
[Your 3-5 sentence summary here]

ACTION_ITEMS:
[JSON array of action items]

DECISIONS:
[JSON array of decisions]

FOLLOW_UP_EMAIL:
[Complete follow-up email]`,m=await i.messages.create({model:"claude-sonnet-4-6",max_tokens:4096,system:c,messages:[{role:"user",content:l}]}),p="text"===m.content[0].type?m.content[0].text:"",u=p.match(/SUMMARY:\s*([\s\S]*?)(?=ACTION_ITEMS:|$)/i),h=p.match(/ACTION_ITEMS:\s*([\s\S]*?)(?=DECISIONS:|$)/i),g=p.match(/DECISIONS:\s*([\s\S]*?)(?=FOLLOW_UP_EMAIL:|$)/i),y=p.match(/FOLLOW_UP_EMAIL:\s*([\s\S]*?)$/i),S=u?u[1].trim():"",O=[];if(h)try{let e=h[1].trim().match(/\[[\s\S]*\]/);e&&(O=JSON.parse(e[0]))}catch{O=[]}let I=[];if(g)try{let e=g[1].trim().match(/\[[\s\S]*\]/);e&&(I=JSON.parse(e[0]))}catch{I=[]}let f=y?y[1].trim():"";return o.NextResponse.json({summary:S,actionItems:O,decisions:I,followUpEmail:f})}catch(e){return console.error("Analysis error:",e),o.NextResponse.json({error:"Failed to analyze meeting. Please try again."},{status:500})}}let l=new r.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/analyze-meeting/route",pathname:"/api/analyze-meeting",filename:"route",bundlePath:"app/api/analyze-meeting/route"},resolvedPagePath:"/Users/husamahmed/FN3/ventures/meetingmind/app/api/analyze-meeting/route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:m,staticGenerationAsyncStorage:p,serverHooks:u}=l,h="/api/analyze-meeting/route";function g(){return(0,s.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:p})}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),n=t.X(0,[948,972],()=>a(140));module.exports=n})();