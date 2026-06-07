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
          "inline-flex items-center justify-center rounded-sm px-8 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 disabled:opacity-50",
          {
            "bg-terracotta text-cream hover:bg-terracotta/90": variant === "primary",
            "bg-transparent text-charcoal hover:bg-black/5": variant === "ghost",
            "border border-brass text-brass hover:bg-brass/10": variant === "brass",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
