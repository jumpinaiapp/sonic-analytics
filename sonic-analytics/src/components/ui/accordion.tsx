"use client";
import * as React from "react";

type Ctx = { open: string | null; setOpen: (v: string | null) => void; collapsible?: boolean };
const AccordionCtx = React.createContext<Ctx | null>(null);

export function Accordion({
  type = "single",
  collapsible = false,
  className = "",
  children
}: { type?: "single"; collapsible?: boolean; className?: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <AccordionCtx.Provider value={{ open, setOpen, collapsible }}>
      <div className={className}>{children}</div>
    </AccordionCtx.Provider>
  );
}

export function AccordionItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <div data-value={value} className="border-b">{children}</div>;
}

export function AccordionTrigger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(AccordionCtx)!;
  const parent = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    parent.current = (document?.currentScript as any)?.parentElement;
  }, []);
  return (
    <button
      onClick={(e) => {
        const item = (e.currentTarget.closest("[data-value]") as HTMLDivElement | null);
        const val = item?.getAttribute("data-value") || null;
        if (!val) return;
        ctx.setOpen(ctx.open === val && ctx.collapsible ? null : val);
      }}
      className={`w-full text-left py-3 font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export function AccordionContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(AccordionCtx)!;
  const [val, setVal] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const item = ref.current?.closest("[data-value]") as HTMLDivElement | null;
    setVal(item?.getAttribute("data-value") || null);
  }, []);
  const open = val !== null && ctx.open === val;
  return (
    <div ref={ref} className={`${open ? "block" : "hidden"} pb-3 text-sm text-muted-foreground ${className}`}>
      {open ? children : null}
    </div>
  );
}
