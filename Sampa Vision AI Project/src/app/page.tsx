export type PlanId = "free" | "pro" | "enterprise";
export type BillingCycle = "monthly" | "annual";
export type TestimonialSize = "wide" | "tall" | "small";
export type FeatureSize = "large" | "small";
export type DemoStepId = "brief" | "generate" | "preview" | "publish";

export interface Plan {
  id: PlanId;
  name: string;
  price: { monthly: number | null; annual: number | null };
  desc: string;
  cta: string;
  ctaHref: string;
  featured: boolean;
  features: readonly string[];
  missing: readonly string[];
}

export interface Testimonial {
  id: string;
  size: TestimonialSize;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  metric: string;
}

export interface Feature {
  id: string;
  size: FeatureSize;
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  badge: string | null;
}

export interface DemoStep {
  id: DemoStepId;
  label: string;
  title: string;
  desc: string;
  logs: readonly string[];
}

export interface Objection {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}
