export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
  topUseCase: string;
}

export const realEstateCategories: Category[] = [
  {
    id: "crm",
    name: "AI CRM & Lead Management",
    description: "Smart CRMs that score, route, and follow up with leads automatically",
    icon: "🎯",
    toolCount: 5,
    topUseCase: "Never let a lead fall through the cracks",
  },
  {
    id: "lead-generation",
    name: "AI Lead Generation",
    description: "Websites, ads, and tools that generate and qualify buyer/seller leads",
    icon: "🔍",
    toolCount: 4,
    topUseCase: "Generate and qualify leads while you sleep",
  },
  {
    id: "listing-descriptions",
    name: "AI Listing Descriptions",
    description: "Generate compelling MLS descriptions and marketing copy in seconds",
    icon: "✍️",
    toolCount: 3,
    topUseCase: "Write a listing description in 60 seconds instead of 60 minutes",
  },
  {
    id: "predictive-analytics",
    name: "Predictive Analytics",
    description: "AI that predicts which homeowners will sell next in your farm area",
    icon: "📊",
    toolCount: 3,
    topUseCase: "Prospect to sellers before they hit the market",
  },
  {
    id: "client-retention",
    name: "Client Retention & Database",
    description: "Tools that keep you top of mind with past clients and your sphere",
    icon: "❤️",
    toolCount: 4,
    topUseCase: "Get 30%+ of deals from repeat and referral clients",
  },
  {
    id: "ai-assistant",
    name: "AI Lead Qualification",
    description: "AI assistants that respond to leads 24/7 and qualify them via text",
    icon: "🤖",
    toolCount: 3,
    topUseCase: "Respond to every lead within 5 seconds, 24/7",
  },
  {
    id: "marketing-automation",
    name: "Email & Marketing Automation",
    description: "Automated campaigns that keep leads engaged with personalized content",
    icon: "📧",
    toolCount: 4,
    topUseCase: "Stay top-of-mind with 500 leads with zero extra time",
  },
  {
    id: "buyer-tools",
    name: "Buyer & Financing Tools",
    description: "AI tools that help buyers compete in tough markets",
    icon: "🏠",
    toolCount: 3,
    topUseCase: "Help contingent buyers make all-cash offers",
  },
];
