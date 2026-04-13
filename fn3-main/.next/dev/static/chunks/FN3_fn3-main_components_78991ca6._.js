(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/FN3/fn3-main/components/nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Nav",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const chapters = [
    {
        label: 'What We Are',
        href: '/what-we-are'
    },
    {
        label: "What We've Built",
        href: '/what-weve-built'
    },
    {
        label: 'How We Work',
        href: '/how-we-work'
    }
];
function Nav({ variant = 'home' }) {
    _s();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 bg-fn3-red",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex items-center justify-between h-[60px] px-6 lg:px-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "font-mono text-[18px] font-bold text-white tracking-[0.05em]",
                        children: "FN3"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex items-center gap-10",
                        children: variant === 'home' ? chapters.map((ch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: ch.href,
                                className: "font-mono text-[13px] uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-150",
                                children: ch.label
                            }, ch.href, false, {
                                fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "font-mono text-[13px] uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-150",
                            children: "← Back to Home"
                        }, void 0, false, {
                            fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/work-with-us",
                            className: "font-mono text-[13px] uppercase tracking-[0.1em] text-white border-b border-white/60 hover:border-white pb-px transition-colors duration-150",
                            children: "Work With Us →"
                        }, void 0, false, {
                            fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "lg:hidden text-white p-2",
                        onClick: ()=>setMobileOpen(!mobileOpen),
                        "aria-label": mobileOpen ? 'Close menu' : 'Open menu',
                        children: mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "18",
                                    y1: "6",
                                    x2: "6",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "6",
                                    y1: "6",
                                    x2: "18",
                                    y2: "18"
                                }, void 0, false, {
                                    fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "3",
                                    y1: "8",
                                    x2: "21",
                                    y2: "8"
                                }, void 0, false, {
                                    fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "3",
                                    y1: "16",
                                    x2: "21",
                                    y2: "16"
                                }, void 0, false, {
                                    fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden bg-fn3-red border-t border-white/10",
                children: [
                    variant === 'chapter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "block px-6 py-4 font-mono text-[13px] uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-150",
                        onClick: ()=>setMobileOpen(false),
                        children: "← Back to Home"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, this),
                    chapters.map((ch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: ch.href,
                            className: "block px-6 py-4 font-mono text-[13px] uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-150 border-t border-white/5",
                            onClick: ()=>setMobileOpen(false),
                            children: ch.label
                        }, ch.href, false, {
                            fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/work-with-us",
                        className: "block px-6 py-4 font-mono text-[13px] uppercase tracking-[0.1em] text-white hover:text-white/80 transition-colors duration-150 border-t border-white/15",
                        onClick: ()=>setMobileOpen(false),
                        children: "Work With Us →"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FN3/fn3-main/components/nav.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/FN3/fn3-main/components/nav.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(Nav, "33pz4tKGxA4/1e2zOoGo8gBQzP0=");
_c = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/FN3/fn3-main/components/home/hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeHero",
    ()=>HomeHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};
const fadeUp = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
};
// ─── Ops Flow Trace ───────────────────────────────────────────────────────────
const SCENARIOS = [
    {
        input: 'lead arrives',
        agent: 'qualifies',
        output: 'booked'
    },
    {
        input: 'invoice created',
        agent: 'reconciles',
        output: 'filed'
    },
    {
        input: 'support ticket',
        agent: 'triages',
        output: 'resolved'
    },
    {
        input: 'appt. request',
        agent: 'schedules',
        output: 'confirmed'
    },
    {
        input: 'contractor req.',
        agent: 'dispatches',
        output: 'assigned'
    }
];
function OpsFlowTrace() {
    _s();
    const [scene, setScene] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0) // 0=input, 1=agent, 2=output
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OpsFlowTrace.useEffect": ()=>{
            const t = setInterval({
                "OpsFlowTrace.useEffect.t": ()=>setScene({
                        "OpsFlowTrace.useEffect.t": (s)=>(s + 1) % SCENARIOS.length
                    }["OpsFlowTrace.useEffect.t"])
            }["OpsFlowTrace.useEffect.t"], 3800);
            return ({
                "OpsFlowTrace.useEffect": ()=>clearInterval(t)
            })["OpsFlowTrace.useEffect"];
        }
    }["OpsFlowTrace.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OpsFlowTrace.useEffect": ()=>{
            // Sync phase transitions with packet animation times
            // packet times: [0, 0.34, 0.38, 0.74, 0.78, 1] over 3800ms
            const cycle = {
                "OpsFlowTrace.useEffect.cycle": ()=>{
                    setPhase(0);
                    const t1 = setTimeout({
                        "OpsFlowTrace.useEffect.cycle.t1": ()=>setPhase(1)
                    }["OpsFlowTrace.useEffect.cycle.t1"], 3800 * 0.34) // ~1292ms — ball hits agent
                    ;
                    const t2 = setTimeout({
                        "OpsFlowTrace.useEffect.cycle.t2": ()=>setPhase(2)
                    }["OpsFlowTrace.useEffect.cycle.t2"], 3800 * 0.74) // ~2812ms — ball hits output
                    ;
                    return ({
                        "OpsFlowTrace.useEffect.cycle": ()=>{
                            clearTimeout(t1);
                            clearTimeout(t2);
                        }
                    })["OpsFlowTrace.useEffect.cycle"];
                }
            }["OpsFlowTrace.useEffect.cycle"];
            let cleanup = cycle();
            const interval = setInterval({
                "OpsFlowTrace.useEffect.interval": ()=>{
                    cleanup();
                    cleanup = cycle();
                }
            }["OpsFlowTrace.useEffect.interval"], 3800);
            return ({
                "OpsFlowTrace.useEffect": ()=>{
                    clearInterval(interval);
                    cleanup();
                }
            })["OpsFlowTrace.useEffect"];
        }
    }["OpsFlowTrace.useEffect"], []);
    const scenario = SCENARIOS[scene];
    const W = 460;
    const nodeY = 20;
    const x1 = 18;
    const x2 = W / 2;
    const x3 = W - 18;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-[460px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "100%",
                viewBox: `0 0 ${W} 42`,
                className: "overflow-visible mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: x1,
                        y1: nodeY,
                        x2: x2,
                        y2: nodeY,
                        stroke: "rgba(255,255,255,0.14)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: x2,
                        y1: nodeY,
                        x2: x3,
                        y2: nodeY,
                        stroke: "rgba(255,255,255,0.14)",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: x1,
                        cy: nodeY,
                        r: "5",
                        fill: "none",
                        strokeWidth: "1",
                        stroke: "white",
                        style: {
                            opacity: phase === 0 ? 0.9 : 0.25,
                            transition: 'opacity 0.3s ease'
                        }
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: x2,
                        cy: nodeY,
                        r: "8",
                        fill: "none",
                        strokeWidth: "1",
                        stroke: "white",
                        style: {
                            opacity: phase === 1 ? 0.9 : 0.25,
                            transition: 'opacity 0.3s ease'
                        }
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: x2,
                        cy: nodeY,
                        r: "3",
                        fill: "white",
                        style: {
                            opacity: phase === 1 ? 0.7 : 0.25,
                            transition: 'opacity 0.3s ease'
                        }
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: x3,
                        cy: nodeY,
                        r: "5",
                        fill: "none",
                        strokeWidth: "1",
                        stroke: "white",
                        style: {
                            opacity: phase === 2 ? 0.9 : 0.25,
                            transition: 'opacity 0.3s ease'
                        }
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                        cy: nodeY,
                        r: "3",
                        fill: "white",
                        animate: {
                            cx: [
                                x1,
                                x2,
                                x2,
                                x3,
                                x3,
                                x1
                            ],
                            opacity: [
                                1,
                                1,
                                1,
                                1,
                                0,
                                0
                            ]
                        },
                        transition: {
                            duration: 3.8,
                            times: [
                                0,
                                0.34,
                                0.38,
                                0.74,
                                0.78,
                                1
                            ],
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: x1,
                        y: 38,
                        textAnchor: "middle",
                        fill: "white",
                        fontSize: "9",
                        fontFamily: "ui-monospace,monospace",
                        letterSpacing: "1.5",
                        style: {
                            opacity: phase === 0 ? 0.9 : 0.3,
                            transition: 'opacity 0.3s ease'
                        },
                        children: "INPUT"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: x2,
                        y: 41,
                        textAnchor: "middle",
                        fill: "white",
                        fontSize: "9",
                        fontFamily: "ui-monospace,monospace",
                        letterSpacing: "1.5",
                        style: {
                            opacity: phase === 1 ? 0.9 : 0.3,
                            transition: 'opacity 0.3s ease'
                        },
                        children: "AGENT"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: x3,
                        y: 38,
                        textAnchor: "middle",
                        fill: "white",
                        fontSize: "9",
                        fontFamily: "ui-monospace,monospace",
                        letterSpacing: "1.5",
                        style: {
                            opacity: phase === 2 ? 0.9 : 0.3,
                            transition: 'opacity 0.3s ease'
                        },
                        children: "OUTPUT"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    duration: 0.4
                },
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[12px] w-[33%] text-left",
                        style: {
                            color: 'white',
                            opacity: phase === 0 ? 1 : 0.35,
                            fontWeight: phase === 0 ? 600 : 400,
                            transition: 'opacity 0.3s ease, font-weight 0.3s ease'
                        },
                        children: scenario.input
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[12px] w-[33%] text-center",
                        style: {
                            color: 'white',
                            opacity: phase === 1 ? 1 : 0.35,
                            fontWeight: phase === 1 ? 600 : 400,
                            transition: 'opacity 0.3s ease, font-weight 0.3s ease'
                        },
                        children: scenario.agent
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[12px] w-[33%] text-right",
                        style: {
                            color: 'white',
                            opacity: phase === 2 ? 1 : 0.35,
                            fontWeight: phase === 2 ? 600 : 400,
                            transition: 'opacity 0.3s ease, font-weight 0.3s ease'
                        },
                        children: scenario.output
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, scene, true, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(OpsFlowTrace, "LB2ip0l16w4tZNmPvgn7zJsh1A8=");
_c = OpsFlowTrace;
// ─── Live Ops Feed ─────────────────────────────────────────────────────────────
const OPS_POOL = [
    {
        agent: 'scheduler',
        task: 'synced 312 appointments',
        ms: '380ms',
        tag: 'SUBZII'
    },
    {
        agent: 'pricing',
        task: 'updated 89 event listings',
        ms: '1.2s',
        tag: 'SUBZII'
    },
    {
        agent: 'intake',
        task: 'qualified 14 inbound leads',
        ms: '820ms',
        tag: 'DETAILMAPS'
    },
    {
        agent: 'dispatch',
        task: 'routed 7 contractors',
        ms: '290ms',
        tag: 'DRYJETS'
    },
    {
        agent: 'forecast',
        task: 'ran demand model',
        ms: '2.1s',
        tag: 'SUBZII'
    },
    {
        agent: 'compliance',
        task: 'flagged 3 patient records',
        ms: '610ms',
        tag: 'DAWA'
    },
    {
        agent: 'comms',
        task: 'dispatched 204 reminders',
        ms: '1.8s',
        tag: 'DETAILMAPS'
    },
    {
        agent: 'analytics',
        task: 'compiled weekly report',
        ms: '3.2s',
        tag: 'FN3'
    },
    {
        agent: 'billing',
        task: 'reconciled 41 invoices',
        ms: '940ms',
        tag: 'DRYJETS'
    },
    {
        agent: 'triage',
        task: 'processed 88 requests',
        ms: '510ms',
        tag: 'DAWA'
    },
    {
        agent: 'inventory',
        task: 'rebalanced stock levels',
        ms: '760ms',
        tag: 'DETAILMAPS'
    },
    {
        agent: 'scoring',
        task: 'ranked 33 applicants',
        ms: '1.4s',
        tag: 'FN3'
    }
];
function LiveOpsFeed() {
    _s1();
    const [entries, setEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4817);
    const counterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(4817);
    const poolIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const idRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveOpsFeed.useEffect": ()=>{
            const initial = [];
            for(let i = 0; i < 7; i++){
                initial.push({
                    ...OPS_POOL[i % OPS_POOL.length],
                    id: idRef.current++
                });
            }
            poolIndex.current = 7;
            setEntries(initial);
            const interval = setInterval({
                "LiveOpsFeed.useEffect.interval": ()=>{
                    const next = OPS_POOL[poolIndex.current % OPS_POOL.length];
                    poolIndex.current++;
                    counterRef.current += Math.floor(Math.random() * 3) + 1;
                    setTotal(counterRef.current);
                    setEntries({
                        "LiveOpsFeed.useEffect.interval": (prev)=>{
                            const updated = [
                                ...prev,
                                {
                                    ...next,
                                    id: idRef.current++
                                }
                            ];
                            return updated.slice(-12);
                        }
                    }["LiveOpsFeed.useEffect.interval"]);
                }
            }["LiveOpsFeed.useEffect.interval"], 1800);
            return ({
                "LiveOpsFeed.useEffect": ()=>clearInterval(interval)
            })["LiveOpsFeed.useEffect"];
        }
    }["LiveOpsFeed.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 12
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.8,
            delay: 0.7
        },
        className: "w-full max-w-[500px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between pb-4 border-b border-fn3-red-faint",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[13px] uppercase tracking-[0.1em] font-semibold text-[#1c1917]",
                        children: "Active Operations"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                className: "w-2 h-2 rounded-full bg-fn3-red",
                                animate: {
                                    opacity: [
                                        1,
                                        0.3,
                                        1
                                    ]
                                },
                                transition: {
                                    duration: 1.4,
                                    repeat: Infinity
                                }
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[12px] uppercase tracking-[0.1em] font-semibold text-fn3-red",
                                children: "Running"
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-[440px]",
                children: entries.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            x: -6
                        },
                        animate: {
                            opacity: i === entries.length - 1 ? 1 : 0.45 + i / entries.length * 0.55
                        },
                        transition: {
                            duration: 0.4
                        },
                        className: "grid grid-cols-[100px_1fr_52px] gap-4 items-baseline py-3 border-b border-fn3-red-faint",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "label-mono text-fn3-red-light truncate",
                                children: entry.agent
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[14px] text-[#1c1917] leading-snug truncate",
                                children: entry.task
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[11px] text-[#9ca3af] text-right",
                                children: entry.ms
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)
                        ]
                    }, entry.id, true, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-5 border-t border-fn3-red-faint flex items-baseline gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            opacity: 0.6
                        },
                        animate: {
                            opacity: 1
                        },
                        className: "font-serif text-[52px] text-[#1c1917] leading-none tabular-nums",
                        children: total.toLocaleString()
                    }, total, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "label-mono text-[#9ca3af]",
                        children: "tasks completed today"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
_s1(LiveOpsFeed, "HepldhnxOb1ZwkQChKF8VxT2atM=");
_c1 = LiveOpsFeed;
function HomeHero() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative bg-fn3-red px-6 lg:px-12 pt-[72px] pb-[90px] min-h-[82vh] flex flex-col justify-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 hidden lg:block pointer-events-none",
                style: {
                    background: 'white',
                    clipPath: 'polygon(58% 0%, 100% 0%, 100% 100%, 44% 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 lg:gap-2 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: stagger,
                        initial: "initial",
                        animate: "animate",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                variants: fadeUp,
                                className: "label-mono text-white/50 mb-8",
                                children: "FN3 — Operational Intelligence"
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: fadeUp,
                                className: "mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OpsFlowTrace, {}, void 0, false, {
                                    fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                                variants: fadeUp,
                                className: "font-display text-[clamp(38px,5vw,64px)] text-white leading-[1.02] tracking-[-0.05em] mb-6",
                                children: [
                                    "Your business,",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                        lineNumber: 274,
                                        columnNumber: 27
                                    }, this),
                                    "run on AI."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                variants: fadeUp,
                                className: "text-[16px] text-white/75 leading-[1.75] max-w-[460px] mb-8",
                                children: "We deploy AI agents and automation into your operations — eliminating manual work, cutting overhead, and building systems that scale. The same infrastructure we run inside our own ventures."
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: fadeUp,
                                className: "flex flex-wrap items-center gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/how-we-work",
                                        className: "inline-block bg-white text-fn3-red font-mono text-[11px] uppercase tracking-[0.1em] font-bold px-6 py-3.5 hover:bg-white/90 transition-colors duration-150",
                                        children: "See How We Work →"
                                    }, void 0, false, {
                                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/what-weve-built",
                                        className: "inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-white/70 border-b border-white/30 hover:text-white hover:border-white pb-px transition-colors duration-150",
                                        children: "View Our Ventures"
                                    }, void 0, false, {
                                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                        lineNumber: 293,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:flex justify-center items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveOpsFeed, {}, void 0, false, {
                            fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-7 left-6 lg:left-12 right-6 lg:right-12 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "label-mono text-white/40",
                        children: "Scroll to explore ↓"
                    }, void 0, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                className: "inline-block w-1.5 h-1.5 rounded-full bg-white/60",
                                animate: {
                                    opacity: [
                                        0.6,
                                        1,
                                        0.6
                                    ]
                                },
                                transition: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "label-mono text-white/40",
                                children: "System Active"
                            }, void 0, false, {
                                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/FN3/fn3-main/components/home/hero.tsx",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
_c2 = HomeHero;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "OpsFlowTrace");
__turbopack_context__.k.register(_c1, "LiveOpsFeed");
__turbopack_context__.k.register(_c2, "HomeHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/FN3/fn3-main/components/ui/fade-in-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FadeInSection",
    ()=>FadeInSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function FadeInSection({ children, className, delay = 0 }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-80px'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        className: className,
        initial: {
            opacity: 0,
            y: 20
        },
        animate: isInView ? {
            opacity: 1,
            y: 0
        } : {
            opacity: 0,
            y: 20
        },
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/FN3/fn3-main/components/ui/fade-in-section.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(FadeInSection, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = FadeInSection;
var _c;
__turbopack_context__.k.register(_c, "FadeInSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/FN3/fn3-main/components/ui/count-up.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountUp",
    ()=>CountUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CountUp({ to, duration = 1.2, className, suffix = '' }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-80px'
    });
    const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const rounded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(count, {
        "CountUp.useTransform[rounded]": (v)=>Math.round(v)
    }["CountUp.useTransform[rounded]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CountUp.useEffect": ()=>{
            if (!isInView) return;
            const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(count, to, {
                duration,
                ease: 'easeOut'
            });
            return ({
                "CountUp.useEffect": ()=>controls.stop()
            })["CountUp.useEffect"];
        }
    }["CountUp.useEffect"], [
        isInView,
        count,
        to,
        duration
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                children: rounded
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/components/ui/count-up.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            suffix
        ]
    }, void 0, true, {
        fileName: "[project]/FN3/fn3-main/components/ui/count-up.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(CountUp, "ODwNMuId2Mx40y2rgzA9OaXBxvQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"],
        __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = CountUp;
var _c;
__turbopack_context__.k.register(_c, "CountUp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/FN3/fn3-main/components/home/numbers-strip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NumbersStrip",
    ()=>NumbersStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$ui$2f$fade$2d$in$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/ui/fade-in-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$ui$2f$count$2d$up$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/FN3/fn3-main/components/ui/count-up.tsx [app-client] (ecmascript)");
'use client';
;
;
;
const stats = [
    {
        value: 5,
        suffix: '',
        label: 'Ventures Running the System',
        accent: true
    },
    {
        value: 200,
        suffix: '+',
        label: 'Agent Workflows',
        accent: false
    },
    {
        value: 6,
        suffix: '',
        label: 'Service Capabilities',
        accent: false
    },
    {
        value: null,
        suffix: '24/7',
        label: 'Autonomous Operations',
        accent: false
    }
];
function NumbersStrip() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-white border-y border-fn3-red-faint px-6 lg:px-12 py-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$ui$2f$fade$2d$in$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FadeInSection"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "label-mono text-fn3-red-light mb-14",
                    children: "At a glance"
                }, void 0, false, {
                    fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-4",
                children: stats.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$ui$2f$fade$2d$in$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FadeInSection"], {
                        delay: i * 0.08,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: [
                                'flex flex-col justify-between h-[120px]',
                                i < stats.length - 1 ? 'lg:pr-12 lg:border-r lg:border-fn3-red-faint' : '',
                                i > 0 ? 'lg:pl-12' : '',
                                i === 1 ? 'pl-6 border-l border-fn3-red-faint' : '',
                                // mobile-only top border for second row items
                                i >= 2 ? 'pt-10 lg:pt-0 border-t lg:border-t-0 border-fn3-red-faint' : ''
                            ].filter(Boolean).join(' '),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `font-serif text-[64px] font-normal leading-none ${stat.accent ? 'text-fn3-red' : 'text-[#1c1917]'}`,
                                    children: stat.value !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$components$2f$ui$2f$count$2d$up$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountUp"], {
                                        to: stat.value,
                                        suffix: stat.suffix
                                    }, void 0, false, {
                                        fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                                        lineNumber: 33,
                                        columnNumber: 19
                                    }, this) : stat.suffix
                                }, void 0, false, {
                                    fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$FN3$2f$fn3$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[15px] font-medium text-[#1c1917]",
                                    children: stat.label
                                }, void 0, false, {
                                    fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this)
                    }, stat.label, false, {
                        fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/FN3/fn3-main/components/home/numbers-strip.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = NumbersStrip;
var _c;
__turbopack_context__.k.register(_c, "NumbersStrip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=FN3_fn3-main_components_78991ca6._.js.map