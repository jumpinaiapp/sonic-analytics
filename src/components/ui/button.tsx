"use client";
import * as React from "react";

type Variant = "default" | "outline" | "secondary";
type Size = "sm" | "lg" | "default";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const sizeClass = (s: Size = "default") =>
  s === "sm" ? "h-8 px-3 text-sm" : s === "lg" ? "h-11 px-5 text-base" : "h-10 px-4 text-sm";

const variantClass = (v: Variant = "default") => ({
  default: "bg-black text-white hover:opacity-90",
  outline: "border border-gray-300 hover:bg-gray-50",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
}[v]);

export function Button({ className = "", variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl font-medium transition ${sizeClass(size)} ${variantClass(variant)} ${className}`}
      {...props}
    />
  );
}
