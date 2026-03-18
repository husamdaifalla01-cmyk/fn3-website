import FooterSection from "@/components/sections/footer/default";
import MardiiLogo from "@/components/logos/mardii";

const productLinks = [
  { text: "Change Monitor", href: "/change-monitor" },
  { text: "Risk Scores", href: "/risk" },
  { text: "Financial Tools", href: "/financial-tools" },
  { text: "API Access", href: "/api-access" },
];

const companyLinks = [
  { text: "About", href: "/about" },
  { text: "Blog", href: "/blog" },
  { text: "Changelog", href: "/changelog" },
];

const connectLinks = [
  { text: "Twitter / X", href: "https://x.com/getmardii" },
  { text: "Contact Us", href: "/contact" },
];

const policyLinks = [
  { text: "Privacy", href: "/legal/privacy" },
  { text: "Terms", href: "/legal/terms" },
];

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className }: SiteFooterProps) {
  return (
    <FooterSection
      logo={<MardiiLogo />}
      name="mardii.com"
      columns={[
        { title: "Product", links: productLinks },
        { title: "Company", links: companyLinks },
        { title: "Connect", links: connectLinks },
      ]}
      copyright="© 2026 mardii.com. All rights reserved."
      policies={policyLinks}
      className={className}
    />
  );
}

