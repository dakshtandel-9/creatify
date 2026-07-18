export type ComparisonRow = {
  label: string;
  traditional: boolean;
  creadify: boolean;
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  { label: "Dedicated strategist per account", traditional: false, creadify: true },
  { label: "Transparent, real-time reporting", traditional: false, creadify: true },
  { label: "Custom strategy, not templated packages", traditional: false, creadify: true },
  { label: "Weekly performance check-ins", traditional: false, creadify: true },
  { label: "Data-backed decision making", traditional: true, creadify: true },
  { label: "Long-term contracts required", traditional: true, creadify: false },
  { label: "Results tied to business outcomes", traditional: false, creadify: true },
];
