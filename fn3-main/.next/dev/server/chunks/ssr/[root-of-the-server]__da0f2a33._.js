module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/FN3/fn3-main/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/FN3/fn3-main/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/FN3/fn3-main/lib/niches.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllNicheIds",
    ()=>getAllNicheIds,
    "getNicheById",
    ()=>getNicheById,
    "niches",
    ()=>niches
]);
const niches = [
    {
        id: 'dental',
        name: 'DENTAL',
        tagline: 'The Chair-Time Recovery Engine',
        description: 'AI-powered operational intelligence that maximizes chair utilization, reduces no-shows, and optimizes patient flow for dental practices.',
        industry: 'Dental Care',
        targetAudience: [
            'Dental Practice Owners',
            'Oral Surgeons',
            'Orthodontists',
            'Practice Managers'
        ],
        painPoints: [
            'High no-show rates eating into daily revenue',
            'Inefficient scheduling leading to chair downtime',
            'Manual insurance verification consuming staff hours',
            'Patient communication gaps causing dissatisfaction',
            'Inventory management creating cash flow issues'
        ],
        solutions: [
            'Intelligent scheduling optimization with predictive no-show modeling',
            'Automated patient communication and reminder systems',
            'Real-time insurance verification and benefits checking',
            'Smart inventory management with automated reordering',
            'Performance analytics and practice efficiency metrics'
        ],
        metrics: [
            {
                label: 'Chair Utilization',
                value: '+35%',
                description: 'Average increase in productive chair time'
            },
            {
                label: 'No-Show Rate',
                value: '-60%',
                description: 'Reduction in missed appointments'
            },
            {
                label: 'Admin Time',
                value: '-8hrs/week',
                description: 'Staff time savings per week'
            }
        ],
        cta: {
            primary: 'Schedule Practice Assessment',
            secondary: 'View Case Studies'
        },
        color: {
            primary: 'from-teal-500 to-cyan-600',
            secondary: 'from-teal-50 to-cyan-50',
            gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600'
        },
        icon: 'Tooth',
        testimonial: {
            quote: "FN3 Hive transformed our practice efficiency. We're seeing 35% more patients with the same staff.",
            author: "Dr. Sarah Chen",
            role: "Practice Owner",
            company: "Elite Dental Care"
        }
    },
    {
        id: 'wealth',
        name: 'WEALTH',
        tagline: 'The Advisor Liberation System',
        description: 'Advanced AI that handles client onboarding, compliance monitoring, and portfolio optimization, freeing advisors to focus on high-value relationship building.',
        industry: 'Wealth Management',
        targetAudience: [
            'Financial Advisors',
            'RIA Firms',
            'Wealth Managers',
            'Financial Planners'
        ],
        painPoints: [
            'Endless compliance documentation consuming billable hours',
            'Client onboarding taking weeks instead of days',
            'Manual portfolio rebalancing across hundreds of accounts',
            'Risk assessment and reporting eating into client time',
            'Regulatory updates requiring constant process changes'
        ],
        solutions: [
            'Automated compliance monitoring and documentation',
            'Streamlined client onboarding with digital workflows',
            'AI-driven portfolio optimization and rebalancing',
            'Intelligent risk assessment and reporting automation',
            'Regulatory change management and process updates'
        ],
        metrics: [
            {
                label: 'Client Capacity',
                value: '+150%',
                description: 'More clients per advisor without burnout'
            },
            {
                label: 'Onboarding Time',
                value: '-80%',
                description: 'Faster client onboarding process'
            },
            {
                label: 'Compliance Cost',
                value: '-70%',
                description: 'Reduction in compliance overhead'
            }
        ],
        cta: {
            primary: 'Book Strategy Session',
            secondary: 'Download ROI Calculator'
        },
        color: {
            primary: 'from-emerald-500 to-green-600',
            secondary: 'from-emerald-50 to-green-50',
            gradient: 'bg-gradient-to-br from-emerald-500 to-green-600'
        },
        icon: 'TrendingUp',
        testimonial: {
            quote: "Our AUM grew 150% in 18 months thanks to FN3's automation. I can finally focus on my clients.",
            author: "Michael Rodriguez",
            role: "Senior Advisor",
            company: "Summit Wealth Partners"
        }
    },
    {
        id: 'law',
        name: 'LAW',
        tagline: 'The Matter Velocity Accelerator',
        description: 'Legal AI that streamlines case management, automates document review, and optimizes billing processes for maximum matter velocity and profitability.',
        industry: 'Legal Services',
        targetAudience: [
            'Law Firm Partners',
            'Solo Practitioners',
            'Legal Operations',
            'Paralegals'
        ],
        painPoints: [
            'Document review consuming 60% of billable hours',
            'Manual time tracking creating billing disputes',
            'Case management scattered across multiple systems',
            'Client communication delays hurting satisfaction',
            'Deadline management causing missed opportunities'
        ],
        solutions: [
            'AI-powered document review and analysis automation',
            'Intelligent time tracking and billing optimization',
            'Unified case management with workflow automation',
            'Automated client communication and status updates',
            'Smart deadline management and conflict checking'
        ],
        metrics: [
            {
                label: 'Document Review',
                value: '+400%',
                description: 'Faster document processing speed'
            },
            {
                label: 'Billing Accuracy',
                value: '+95%',
                description: 'Automated time capture accuracy'
            },
            {
                label: 'Matter Velocity',
                value: '+65%',
                description: 'Faster case resolution'
            }
        ],
        cta: {
            primary: 'Request Firm Demo',
            secondary: 'View Success Stories'
        },
        color: {
            primary: 'from-blue-500 to-indigo-600',
            secondary: 'from-blue-50 to-indigo-50',
            gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600'
        },
        icon: 'Scale',
        testimonial: {
            quote: "FN3 Hive reduced our document review time by 75%. We're closing cases faster than ever.",
            author: "Jennifer Walsh",
            role: "Managing Partner",
            company: "Walsh & Associates"
        }
    },
    {
        id: 'clinics',
        name: 'CLINICS',
        tagline: 'The Patient Flow Optimizer',
        description: 'Medical AI that optimizes patient scheduling, automates clinical workflows, and enhances care coordination for urgent care and walk-in clinics.',
        industry: 'Healthcare',
        targetAudience: [
            'Clinic Directors',
            'Medical Practice Owners',
            'Healthcare Administrators',
            'Nurse Managers'
        ],
        painPoints: [
            'Unpredictable patient volumes causing wait time spikes',
            'Manual triage and intake slowing patient flow',
            'Insurance verification delays at point of care',
            'Staff scheduling mismatched to patient demand',
            'Clinical documentation consuming physician time'
        ],
        solutions: [
            'Predictive patient volume modeling and staff optimization',
            'Automated triage and digital intake processes',
            'Real-time insurance verification and pre-authorization',
            'AI-powered staff scheduling based on demand patterns',
            'Clinical documentation assistance and workflow automation'
        ],
        metrics: [
            {
                label: 'Wait Time',
                value: '-45%',
                description: 'Average patient wait time reduction'
            },
            {
                label: 'Patient Volume',
                value: '+60%',
                description: 'More patients served per day'
            },
            {
                label: 'Documentation Time',
                value: '-50%',
                description: 'Less time on paperwork per patient'
            }
        ],
        cta: {
            primary: 'Schedule Clinic Walkthrough',
            secondary: 'Download Patient Flow Guide'
        },
        color: {
            primary: 'from-purple-500 to-violet-600',
            secondary: 'from-purple-50 to-violet-50',
            gradient: 'bg-gradient-to-br from-purple-500 to-violet-600'
        },
        icon: 'Heart',
        testimonial: {
            quote: "Patient satisfaction scores increased 40% after implementing FN3. Flow is everything in urgent care.",
            author: "Dr. Amanda Foster",
            role: "Medical Director",
            company: "CityMed Urgent Care"
        }
    },
    {
        id: 'trades',
        name: 'TRADES/AUTO',
        tagline: 'The Parts & Labor Profit Protector',
        description: 'Intelligent operations AI that optimizes parts inventory, automates job scheduling, and maximizes labor efficiency for automotive and trade businesses.',
        industry: 'Automotive & Trades',
        targetAudience: [
            'Shop Owners',
            'Service Managers',
            'Fleet Managers',
            'Trade Contractors'
        ],
        painPoints: [
            'Parts ordering tied up in cash with frequent stockouts',
            'Job scheduling inefficiencies causing customer delays',
            'Manual estimate creation taking too long',
            'Technician productivity varying wildly by day',
            'Customer communication gaps hurting retention'
        ],
        solutions: [
            'Predictive parts inventory management and just-in-time ordering',
            'Intelligent job scheduling and bay optimization',
            'Automated estimate generation with dynamic pricing',
            'Technician performance tracking and productivity optimization',
            'Customer communication automation and job status updates'
        ],
        metrics: [
            {
                label: 'Parts Efficiency',
                value: '+85%',
                description: 'Better inventory turns, less cash tied up'
            },
            {
                label: 'Labor Utilization',
                value: '+40%',
                description: 'More billable hours per technician'
            },
            {
                label: 'Customer Retention',
                value: '+30%',
                description: 'Higher repeat customer rate'
            }
        ],
        cta: {
            primary: 'Book Shop Assessment',
            secondary: 'View ROI Calculator'
        },
        color: {
            primary: 'from-orange-500 to-red-600',
            secondary: 'from-orange-50 to-red-50',
            gradient: 'bg-gradient-to-br from-orange-500 to-red-600'
        },
        icon: 'Wrench',
        testimonial: {
            quote: "FN3 helped us increase revenue per bay by 40% while cutting parts costs. Game-changing results.",
            author: "Carlos Mendez",
            role: "Shop Owner",
            company: "Elite Auto Service"
        }
    }
];
function getNicheById(id) {
    return niches.find((niche)=>niche.id === id);
}
function getAllNicheIds() {
    return niches.map((niche)=>niche.id);
}
}),
"[project]/FN3/fn3-main/components/navigation.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Navigation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Navigation() from the server but Navigation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/FN3/fn3-main/components/navigation.tsx <module evaluation>", "Navigation");
}),
"[project]/FN3/fn3-main/components/navigation.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Navigation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Navigation() from the server but Navigation is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/FN3/fn3-main/components/navigation.tsx", "Navigation");
}),
"[project]/FN3/fn3-main/components/navigation.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/navigation.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/navigation.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/FN3/fn3-main/components/niche-hero.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NicheHero",
    ()=>NicheHero
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NicheHero = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NicheHero() from the server but NicheHero is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/FN3/fn3-main/components/niche-hero.tsx <module evaluation>", "NicheHero");
}),
"[project]/FN3/fn3-main/components/niche-hero.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NicheHero",
    ()=>NicheHero
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NicheHero = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NicheHero() from the server but NicheHero is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/FN3/fn3-main/components/niche-hero.tsx", "NicheHero");
}),
"[project]/FN3/fn3-main/components/niche-hero.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$niche$2d$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/niche-hero.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$niche$2d$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/niche-hero.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$niche$2d$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/FN3/fn3-main/components/pain-points-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PainPointsSection",
    ()=>PainPointsSection
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const PainPointsSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PainPointsSection() from the server but PainPointsSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/FN3/fn3-main/components/pain-points-section.tsx <module evaluation>", "PainPointsSection");
}),
"[project]/FN3/fn3-main/components/pain-points-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PainPointsSection",
    ()=>PainPointsSection
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const PainPointsSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call PainPointsSection() from the server but PainPointsSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/FN3/fn3-main/components/pain-points-section.tsx", "PainPointsSection");
}),
"[project]/FN3/fn3-main/components/pain-points-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$pain$2d$points$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/pain-points-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$pain$2d$points$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/pain-points-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$pain$2d$points$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/FN3/fn3-main/app/[niche]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NichePage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$lib$2f$niches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/lib/niches.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/navigation.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$niche$2d$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/niche-hero.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$pain$2d$points$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/pain-points-section.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function generateStaticParams() {
    const nicheIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$lib$2f$niches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllNicheIds"])();
    return nicheIds.map((id)=>({
            niche: id
        }));
}
async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const niche = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$lib$2f$niches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNicheById"])(resolvedParams.niche);
    if (!niche) {
        return {
            title: 'Page Not Found - FlowNexis3'
        };
    }
    return {
        title: `${niche.name} | ${niche.tagline} - FlowNexis3`,
        description: niche.description,
        keywords: `${niche.industry}, AI automation, ${niche.targetAudience.join(', ')}, FlowNexis3`,
        openGraph: {
            title: `${niche.name} | ${niche.tagline}`,
            description: niche.description,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: `${niche.name} | ${niche.tagline}`,
            description: niche.description
        }
    };
}
async function NichePage({ params }) {
    const resolvedParams = await params;
    const niche = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$lib$2f$niches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNicheById"])(resolvedParams.niche);
    if (!niche) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Navigation"], {}, void 0, false, {
                fileName: "[project]/FN3/fn3-main/app/[niche]/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$niche$2d$hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NicheHero"], {
                niche: niche
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/app/[niche]/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$pain$2d$points$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PainPointsSection"], {
                niche: niche
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/app/[niche]/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/FN3/fn3-main/app/[niche]/page.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}),
"[project]/FN3/fn3-main/app/[niche]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/FN3/fn3-main/app/[niche]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da0f2a33._.js.map