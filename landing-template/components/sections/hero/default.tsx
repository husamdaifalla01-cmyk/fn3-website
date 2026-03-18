import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import Github from "../../logos/github";
import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string | ReactNode;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Give your big idea the design it deserves",
  description = "Professionally designed blocks and templates built with React, Shadcn/ui and Tailwind that will help your product stand out.",
  mockup = (
    <Screenshot
      srcLight="/placeholder-light.svg"
      srcDark="/placeholder-dark.svg"
      alt="Launch UI app screenshot"
      width={1248}
      height={765}
      className="w-full"
    />
  ),
  badge = (
    <Badge variant="outline" className="animate-appear">
      <span className="text-muted-foreground">
        New version of Launch UI is out!
      </span>
      <a href="https://www.launchuicomponents.com/" className="flex items-center gap-1">
        Get started
        <ArrowRightIcon className="size-3" />
      </a>
    </Badge>
  ),
  buttons = [
    {
      href: "https://www.launchuicomponents.com/",
      text: "Get Started",
      variant: "default",
    },
    {
      href: "https://www.launchuicomponents.com/",
      text: "Github",
      variant: "glow",
      icon: <Github className="mr-2 size-4" />,
    },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "hero-section relative overflow-hidden border-b-0 pb-4 sm:pb-8 md:pb-16 lg:pb-20 xl:pb-24",
        className,
      )}
    >
      <div className="max-w-container mx-auto flex flex-col gap-3 sm:gap-4 md:gap-8 lg:gap-12 -mt-8 sm:-mt-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-6 lg:gap-8 text-center">
          {badge !== false && badge}
          <h1 className="hero-title animate-appear inline-block text-lg leading-tight font-bold text-balance text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)] sm:text-2xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight px-2 sm:px-4 max-w-[280px] sm:max-w-none">
            {title}
          </h1>
          <p className="hero-description text-sm animate-appear text-white max-w-[300px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[740px] xl:max-w-[800px] font-medium sm:font-bold text-balance opacity-0 delay-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-base md:text-lg lg:text-xl px-3 sm:px-4">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="hero-buttons animate-appear flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 delay-300 relative z-[60] w-full px-4 sm:px-0">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  asChild
                  className={`shadow-lg relative z-[9999] w-full sm:w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[220px] h-10 sm:h-11 md:h-12 lg:h-12 xl:h-12 text-sm sm:text-base md:text-base lg:text-base xl:text-base font-medium ${
                    button.variant === 'white'
                      ? '!bg-white !text-black hover:!bg-white/90 !border-0 dark:!bg-white dark:!text-black'
                      : button.variant === 'orange'
                      ? '!bg-orange-500 !text-white hover:!bg-orange-600 !border-0 dark:!bg-orange-500 dark:!text-white'
                      : button.variant === 'glow-brand'
                      ? '!bg-brand !text-brand-foreground hover:!bg-brand/90 shadow-lg shadow-brand/25 !border-0 dark:!bg-brand dark:!text-brand-foreground'
                      : ''
                  }`}
                  style={{
                    backgroundColor: button.variant === 'white'
                      ? '#ffffff !important'
                      : button.variant === 'orange'
                      ? '#f97316 !important'
                      : button.variant === 'glow-brand'
                      ? '#ff6b35 !important'
                      : undefined,
                    color: button.variant === 'white'
                      ? '#000000 !important'
                      : button.variant === 'orange' || button.variant === 'glow-brand'
                      ? '#ffffff !important'
                      : undefined,
                    border: 'none !important',
                    zIndex: 9999
                  }}
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </a>
                </Button>
              ))}
            </div>
          )}
          {mockup !== false && (
            <div className="relative w-full pt-1 sm:pt-2 md:pt-4">
              {mockup}
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
      {/* Fade overlay separating hero from next section */}
      {mockup === false && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
      )}
    </Section>
  );
}
