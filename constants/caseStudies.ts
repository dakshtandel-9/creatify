import type { CaseStudy } from "@/types/content";

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "Northwind Retail",
    industry: "E-commerce",
    image: "retail",
    challenge:
      "Stagnant paid-ad ROAS and rising customer acquisition costs were eating into margins on their core product lines.",
    solution:
      "Rebuilt the Meta and Google account structure, redesigned landing pages for their top 12 SKUs, and ran a 6-week CRO testing sprint.",
    results: [
      { label: "ROAS", value: "+142%" },
      { label: "CAC", value: "-38%" },
      { label: "Conv. Rate", value: "+67%" },
    ],
  },
  {
    client: "Solace Health",
    industry: "Healthcare",
    image: "health",
    challenge:
      "A multi-location clinic group needed a predictable pipeline of qualified appointment bookings without violating healthcare ad policies.",
    solution:
      "Built a compliant Google Ads + local SEO program with location-specific landing pages and automated appointment-reminder flows.",
    results: [
      { label: "Bookings", value: "+210%" },
      { label: "Cost/Lead", value: "-44%" },
      { label: "Organic Traffic", value: "+180%" },
    ],
  },
  {
    client: "Vantage Realty",
    industry: "Real Estate",
    image: "realty",
    challenge:
      "Lead volume was strong but agents were spending hours qualifying unfit prospects instead of closing deals.",
    solution:
      "Deployed a marketing automation and lead-scoring system integrated with their CRM, plus a rebuilt listings site with instant valuation tools.",
    results: [
      { label: "Qualified Leads", value: "+96%" },
      { label: "Time-to-Close", value: "-31%" },
      { label: "Revenue", value: "+58%" },
    ],
  },
];
