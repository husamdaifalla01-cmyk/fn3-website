export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
  topUseCase: string;
}

export const healthcareCategories: Category[] = [
  {
    id: "clinical-documentation",
    name: "AI Clinical Documentation",
    description: "Ambient AI scribes that turn patient conversations into accurate clinical notes",
    icon: "📋",
    toolCount: 5,
    topUseCase: "Save 2-3 hours/day on documentation",
  },
  {
    id: "clinical-decision-support",
    name: "Clinical Decision Support",
    description: "AI that surfaces diagnoses, alerts, and evidence-based recommendations in real-time",
    icon: "🧠",
    toolCount: 3,
    topUseCase: "Catch diagnoses before they become missed opportunities",
  },
  {
    id: "revenue-cycle",
    name: "Revenue Cycle AI",
    description: "AI tools for coding accuracy, prior authorization, and revenue capture",
    icon: "💰",
    toolCount: 4,
    topUseCase: "Recover $1,000-2,500/physician/month in missed revenue",
  },
  {
    id: "population-health",
    name: "Population Health",
    description: "AI platforms that manage patient panels and value-based care contracts",
    icon: "📊",
    toolCount: 3,
    topUseCase: "Identify high-risk patients before hospitalizations",
  },
  {
    id: "telehealth-ai",
    name: "Telehealth AI",
    description: "AI tools designed specifically for virtual care encounters",
    icon: "💻",
    toolCount: 3,
    topUseCase: "Document telehealth visits as accurately as in-person",
  },
  {
    id: "prior-authorization",
    name: "Prior Authorization",
    description: "AI that automates prior auth requests, reducing 15 hours to under 3",
    icon: "✅",
    toolCount: 4,
    topUseCase: "Cut prior auth staff time by 80%",
  },
];
