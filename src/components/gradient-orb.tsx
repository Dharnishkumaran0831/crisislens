import { cn } from "@/lib/utils";

export function GradientOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full opacity-40 blur-3xl bg-gradient-brand",
        className,
      )}
    />
  );
}
