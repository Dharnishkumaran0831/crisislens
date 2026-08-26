import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 font-display", className)}>
      {showText && (
        <span className="text-lg font-semibold tracking-tight">
          Career<span className="text-gradient-brand">Pilot</span>
        </span>
      )}
    </Link>
  );
}
