"use client";

import { useState, useEffect } from "react";
import SiteNav from "@/components/layout/site-nav";
import AuroraHeroBg from "@/components/ui/aurora-hero-bg";

interface StickyNavProps {
  className?: string;
}

export default function StickyNav({ className }: StickyNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldShow = scrollTop > 80;

      if (shouldShow !== isScrolled) {
        setIsScrolled(shouldShow);

        // Small delay for smooth appearance
        if (shouldShow) {
          setTimeout(() => setIsVisible(true), 50);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [isScrolled]);

  return (
    <>
      {/* Normal nav when at top */}
      <div className={`transition-opacity duration-300 ${!isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${className}`}>
        <SiteNav />
      </div>

      {/* Sticky nav with aurora background when scrolled */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled && isVisible
            ? 'translate-y-0 opacity-100 backdrop-blur-sm'
            : '-translate-y-full opacity-0'
        }`}
        style={{
          transform: `translateY(${isScrolled && isVisible ? '0' : '-100%'})`,
        }}
      >
        <div className="relative">
          <AuroraHeroBg />
          <div className="bg-black/10 backdrop-blur-sm">
            <SiteNav />
          </div>
        </div>
      </div>
    </>
  );
}