"use client";
import * as React from "react";

type TabsContextType = {
  value: string;
  setValue: (v: string) => void;
};
const TabsContext = React.createContext<TabsContextType | null>(null);

export function Tabs({
  value,
  onValueChange,
  className = "",
  children,
}: {
  value: string;
  onValueChange: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={`inline-flex flex-wrap gap-2 ${className}`} {...props} />;
}

export function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const ctx = React.useContext(TabsContext)!;
  const selected = ctx.value === value;
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={() => ctx.setValue(value)}
      className={`rounded-full border px-3 py-1.5 text-sm transition ${
        selected ? "bg-black text-white" : "bg-white hover:bg-gray-50"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const ctx = React.useContext(TabsContext)!;
  const visible = ctx.value === value;
  return (
    <div role="tabpanel" className={`${visible ? "block" : "hidden"} ${className}`} {...props}>
      {visible ? children : null}
    </div>
  );
}
