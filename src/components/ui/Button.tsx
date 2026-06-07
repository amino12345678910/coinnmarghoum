import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "brass";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 disabled:opacity-50 disabled:hover:translate-y-0",
          {
            "border border-terracotta bg-terracotta text-cream shadow-terracotta/20 hover:bg-brass hover:text-charcoal": variant === "primary",
            "bg-transparent text-charcoal hover:bg-black/5": variant === "ghost",
            "border border-brass text-brass shadow-brass/10 hover:bg-brass hover:text-charcoal": variant === "brass",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
