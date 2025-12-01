"use client";
import * as React from "react";

type Variant = "default" | "secondary" | "outline";

export function Badge({ className = "", variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const styles =
    variant === "secondary"
      ? "bg-gray-100 text-gray-900"
      : variant === "outline"
      ? "border border-gray-300 text-gray-700"
      : "bg-black text-white";
  return <span className={`${base} ${styles} ${className}`} {...props} />;
}
