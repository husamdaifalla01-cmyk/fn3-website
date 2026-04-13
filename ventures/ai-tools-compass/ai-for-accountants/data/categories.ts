export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
  topUseCase: string;
}

export const accountingCategories: Category[] = [
  {
    id: "bookkeeping",
    name: "AI Bookkeeping",
    description: "Automate transaction categorization, reconciliation, and month-end close",
    icon: "📒",
    toolCount: 6,
    topUseCase: "Eliminate 80%+ of manual data entry",
  },
  {
    id: "receipt-capture",
    name: "Receipt & Document Capture",
    description: "Extract data from receipts, invoices, and bank statements with AI OCR",
    icon: "📄",
    toolCount: 4,
    topUseCase: "Go from paper receipt to accounting entry in seconds",
  },
  {
    id: "accounts-payable",
    name: "AP Automation",
    description: "Automate the full accounts payable cycle from invoice receipt to payment",
    icon: "💳",
    toolCount: 5,
    topUseCase: "Achieve 85%+ touchless invoice processing",
  },
  {
    id: "tax-research",
    name: "AI Tax Research",
    description: "Get cited answers to complex tax questions in minutes, not hours",
    icon: "⚖️",
    toolCount: 4,
    topUseCase: "Research obscure tax positions with code citations",
  },
  {
    id: "financial-forecasting",
    name: "Financial Forecasting & FP&A",
    description: "AI-powered forecasts, scenario modeling, and cash flow analysis",
    icon: "📈",
    toolCount: 5,
    topUseCase: "Offer advisory services without hiring an FP&A analyst",
  },
  {
    id: "spend-management",
    name: "Corporate Cards & Spend Management",
    description: "Smart corporate cards with real-time controls and AI savings detection",
    icon: "💰",
    toolCount: 3,
    topUseCase: "Reduce company spend 3–5% through AI-detected savings",
  },
  {
    id: "client-communication",
    name: "Client Communication",
    description: "AI tools for responding to client questions, drafting emails, and portal management",
    icon: "💬",
    toolCount: 4,
    topUseCase: "Handle routine client questions with AI, focus on advisory",
  },
  {
    id: "audit-preparation",
    name: "Audit Preparation",
    description: "AI tools that organize documents, flag discrepancies, and streamline audit support",
    icon: "🔍",
    toolCount: 3,
    topUseCase: "Reduce audit prep time by 60%",
  },
];
