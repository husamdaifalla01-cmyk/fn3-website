import { type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Section } from "../../ui/section";
import AuroraHeroBg from "../../ui/aurora-hero-bg";

interface CTAButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface CTAProps {
  title?: string;
  buttons?: CTAButtonProps[] | false;
  className?: string;
}

export default function CTA({
  title = "Start building",
  buttons = [
    {
      href: "https://www.launchuicomponents.com/",
      text: "Get Started",
      variant: "default",
    },
  ],
  className,
}: CTAProps) {
  return (
    <Section className={cn("cta-section group relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24", className)}>
      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AuroraHeroBg />
      </div>

      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-4 sm:gap-6 md:gap-8 text-center px-4 sm:px-6 lg:px-8">
        <h2 className="cta-title max-w-[280px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[740px] xl:max-w-[800px] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight font-semibold sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-4">
          {title}
        </h2>
        {buttons !== false && buttons.length > 0 && (
          <div className="hero-buttons flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 relative z-[60] w-full sm:w-auto">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "default"}
                size="lg"
                asChild
                className={`relative z-[9999] w-full sm:w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[220px] h-10 sm:h-11 md:h-12 lg:h-12 xl:h-12 text-sm sm:text-base md:text-base lg:text-base xl:text-base font-medium ${
                  button.variant === 'white'
                    ? '!bg-white !text-black hover:!bg-white/90 !border-0 dark:!bg-white dark:!text-black'
                    : button.variant === 'orange'
                    ? '!bg-orange-500 !text-white hover:!bg-orange-600 !border-0 dark:!bg-orange-500 dark:!text-white'
                    : ''
                }`}
                style={{
                  backgroundColor: button.variant === 'white' ? '#ffffff !important' : button.variant === 'orange' ? '#f97316 !important' : undefined,
                  color: button.variant === 'white' ? '#000000 !important' : button.variant === 'orange' ? '#ffffff !important' : undefined,
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
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}
