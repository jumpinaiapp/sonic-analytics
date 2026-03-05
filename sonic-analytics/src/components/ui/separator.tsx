"use client";
import * as React from "react";

export function Separator({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`w-full border-t ${className}`} {...props} />;
}
