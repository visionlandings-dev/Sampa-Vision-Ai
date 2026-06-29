import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-mono text-[0.65rem] tracking-[0.15em] uppercase",
    "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-void",
    "disabled:pointer-events-none disabled:opacity-40",
    "cursor-none select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-electric text-white",
          "hover:bg-electric-hover hover:shadow-[0_0_24px_rgba(91,110,255,0.35),0_4px_20px_rgba(91,110,255,0.25)]",
          "active:bg-electric-dim active:translate-y-px",
        ],
        ghost: [
          "text-fog border border-stone",
          "hover:text-bone hover:border-bone",
          "active:text-ghost",
        ],
        outline: [
          "text-electric border border-border-hover bg-transparent",
          "hover:bg-electric hover:text-white",
          "hover:shadow-[0_0_20px_rgba(91,110,255,0.2)]",
        ],
        link: [
          "text-fog underline-offset-4",
          "hover:text-bone hover:underline",
          "p-0 h-auto",
        ],
      },
      size: {
        sm:  "px-4 py-2 text-[0.58rem]",
        md:  "px-5 py-3",
        lg:  "px-7 py-4 text-[0.72rem]",
        xl:  "px-8 py-5 text-[0.78rem]",
        icon:"w-9 h-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
