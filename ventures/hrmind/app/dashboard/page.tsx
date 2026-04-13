import Link from "next/link";

const tools = [
  {
    icon: "👤",
    title: "Employee Onboarding",
    description: "Generate first-day checklists and 30/60/90-day plans with state-specific compliance.",
    href: "/onboarding",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    badge: "Most Used",
  },
  {
    icon: "📋",
    title: "Policy Generator",
    description: "Write employee handbook sections in seconds — PTO, non-discrimination, remote work, and more.",
    href: "/policies",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
    badge: null,
  },
  {
    icon: "⭐",
    title: "Performance Reviews",
    description: "Generate fair, legally defensible reviews with structured feedback and next-period goals.",
    href: "/reviews",
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
    badge: null,
  },
  {
    icon: "💼",
    title: "Job Descriptions",
    description: "Create EEOC-compliant job descriptions optimized for Indeed and LinkedIn.",
    href: "/jobs",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    badge: null,
  },
  {
    icon: "📄",
    title: "Termination Docs",
    description: "Generate separation agreements, COBRA notices, and final pay docs with state law applied.",
    href: "/termination",
    color: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    badge: null,
  },
  {
    icon: "💬",
    title: "HR Q&A",
    description: "Ask any HR or employment law question. Get answers with relevant statutes cited.",
    href: "/qa",
    color: "bg-indigo-50 border-indigo-200",
    iconBg: "bg-indigo-100",
    badge: "New",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HR</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">HRMind</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Growth Plan</span>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning.</h1>
          <p className="text-gray-600">
            What HR task can we help you with today?
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">14</div>
            <div className="text-sm text-gray-500 mt-1">Documents this month</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">8 hrs</div>
            <div className="text-sm text-gray-500 mt-1">Time saved this month</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">25</div>
            <div className="text-sm text-gray-500 mt-1">Employee limit (Growth)</div>
          </div>
        </div>

        {/* Tools grid */}
        <h2 className="text-lg font-semibold text-gray-900 mb-5">HR Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`group border-2 rounded-2xl p-6 hover:shadow-md transition-all duration-200 relative ${tool.color} bg-white`}
            >
              {tool.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  {tool.badge}
                </span>
              )}
              <div className={`w-12 h-12 ${tool.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {tool.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Recent activity placeholder */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h2>
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-3">📁</div>
            <p className="text-sm">No documents yet. Generate your first HR document above.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
