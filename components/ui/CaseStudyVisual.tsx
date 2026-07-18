import { cn } from "@/lib/utils";

const GRADIENTS: Record<string, string> = {
  retail: "from-accent-500 via-accent-600 to-primary-900",
  health: "from-secondary-400 via-secondary-600 to-primary-900",
  realty: "from-primary-700 via-primary-800 to-primary-950",
};

const PATTERNS: Record<string, string> = {
  retail:
    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0, transparent 35%)",
  health:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 24px)",
  realty:
    "linear-gradient(120deg, rgba(70,211,243,0.18) 0%, transparent 45%), linear-gradient(240deg, rgba(255,122,26,0.14) 0%, transparent 50%)",
};

export function CaseStudyVisual({ variant }: { variant: string }) {
  return (
    <div
      className={cn(
        "relative h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br",
        GRADIENTS[variant] ?? GRADIENTS.retail
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: PATTERNS[variant] ?? PATTERNS.retail }}
      />
    </div>
  );
}
