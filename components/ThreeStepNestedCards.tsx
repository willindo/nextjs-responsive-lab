"use client";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import React from "react";

/**
 * ThreeStepNestedCards (Tailwind only, no shadcn dependency)
 */
export default function ThreeStepNestedCards() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Three-Step Nested Cards</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          Each card has a distinct responsive size and uniquely positioned child elements.
        </p>
      </header>

      <div className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-[1400px] mx-auto">
        <StepCard
          icon={Layers}
          title="Step 1: Foundation"
          subtitle="Set the base layer"
          sizeClasses="h-[360px] sm:h-[420px] md:h-[520px] xl:h-[560px]"
          childPosition="top-left"
          childContent={<StatsBox label="Schemas" value="6" hint="ready" />}
        >
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Create baseline components</li>
            <li>• Configure tokens & spacing</li>
            <li>• Lock container queries</li>
          </ul>
        </StepCard>

        <StepCard
          icon={Sparkles}
          title="Step 2: Compose"
          subtitle="Combine building blocks"
          sizeClasses="h-[300px] sm:h-[360px] md:h-[420px] xl:h-[460px]"
          childPosition="center"
          childContent={<BadgeCloud />}
        >
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Orchestrate motion variants</li>
            <li>• Define interactive affordances</li>
            <li>• Hardening with tests</li>
          </ul>
        </StepCard>

        <StepCard
          icon={ArrowRight}
          title="Step 3: Ship"
          subtitle="Release with confidence"
          sizeClasses="h-[280px] sm:h-[320px] md:h-[360px] xl:h-[400px]"
          childPosition="bottom-right"
          childContent={<CTAProgress label="Deploys" value={78} suffix="%" />}
        >
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Continuous delivery gates</li>
            <li>• Observability hooks</li>
            <li>• Rollback + canaries</li>
          </ul>
        </StepCard>
      </div>
    </div>
  );
}

type StepCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  sizeClasses?: string;
  childPosition?: "top-left" | "center" | "bottom-right";
  childContent?: React.ReactNode;
  children?: React.ReactNode;
};

const StepCard: React.FC<StepCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  sizeClasses = "h-[360px]",
  childPosition = "top-left",
  childContent,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="relative"
    >
      <div className={`relative overflow-hidden rounded-2xl border bg-background shadow-sm ${sizeClasses}`}>
        <div className="p-4 sm:p-6 border-b">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-xl p-2 border bg-background shadow-sm">
              <Icon className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl truncate font-semibold">
                {title}
              </h3>
              {subtitle ? (
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 h-full relative">
          <div className="pr-2 md:pr-4 text-muted-foreground">{children}</div>

          <div className={positionClass(childPosition)}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              {childContent}
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-[85%] rounded-full blur-2xl opacity-30 dark:opacity-20 bg-gradient-to-r from-foreground/10 via-transparent to-foreground/10" />
        </div>
      </div>
    </motion.div>
  );
};

function positionClass(pos: StepCardProps["childPosition"]) {
  switch (pos) {
    case "top-left":
      return "absolute top-4 left-4";
    case "center":
      return "absolute inset-0 flex items-center justify-center";
    case "bottom-right":
      return "absolute bottom-4 right-4";
    default:
      return "absolute top-4 left-4";
  }
}

function StatsBox({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl border bg-background/80 backdrop-blur px-4 py-3 shadow-sm min-w-[120px]">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold leading-none mt-1">{value}</div>
      {hint ? <div className="text-xs text-muted-foreground mt-1">{hint}</div> : null}
    </div>
  );
}

function BadgeCloud() {
  const items = ["UI", "Motion", "Grid", "DX", "a11y", "QA"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="text-xs md:text-sm rounded-xl border px-2.5 py-1 shadow-sm bg-background/80 backdrop-blur"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function CTAProgress({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-[180px] md:w-[220px] rounded-2xl border bg-background/80 backdrop-blur p-3 shadow-sm">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>
          {pct}
          {suffix}
        </span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-foreground" style={{ width: `${pct}%` }} />
      </div>
      <button className="mt-3 inline-flex items-center gap-1.5 text-xs md:text-sm font-medium border rounded-xl px-3 py-1.5 hover:shadow-md transition-shadow">
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
