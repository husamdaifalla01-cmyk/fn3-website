import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import WhoItsFor from "@/components/WhoItsFor";
import SampleIssue from "@/components/SampleIssue";
import WhatYouGet from "@/components/WhatYouGet";
import IssuePreview from "@/components/IssuePreview";
import ROICalculator from "@/components/ROICalculator";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <Hero />
      <SocialProof />
      <WhoItsFor />
      <SampleIssue />
      <WhatYouGet />
      <IssuePreview />
      <ROICalculator />
      <Pricing />
      <FAQ />
      <SignupForm />
      <Footer />
    </main>
  );
}
