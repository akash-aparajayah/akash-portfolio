export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: string;
  year: string;
  featured?: boolean;
  problem: string;
  built: string;
  decisions: string[];
  outcome: string;
  stack: string[];
  image: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "fintle",
    title: "Fintle",
    tagline: "Accounting software for small businesses.",
    status: "In development",
    year: "2025",
    featured: true,
    image: "/work/fintle.svg",
    problem:
      "Small business owners track money across spreadsheets and chat threads, then lose days at month end reconciling what actually happened.",
    built:
      "A React and TypeScript web app for invoices, expenses and reports, with one consistent set of accounting rules behind every screen.",
    decisions: [
      "One typed API client shared by all screens, so a data change fails at compile time instead of in production.",
      "Accounting rules live in their own module, apart from UI components, so they can be tested alone.",
    ],
    outcome:
      "Internal builds now close a month from a single ledger instead of stitching spreadsheets together. Still in active development.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "roja-admin-console",
    title: "Roja admin console",
    tagline: "Admin console for a multi-vendor marketplace.",
    status: "In development",
    year: "2025",
    image: "/work/roja.svg",
    problem:
      "Operators needed one place to manage sellers, orders and settings, and each team wanted its own view of the data.",
    built:
      "A React and Vite console with a configurable top bar, a settings page, theme support and per-user table column settings.",
    decisions: [
      "Design tokens drive theming, so a new theme is a data change, not a rewrite.",
      "Column preferences are saved per user, so every table remembers how each operator works.",
    ],
    outcome:
      "Operators can rearrange tables and switch themes without waiting on a developer. The console is still being extended.",
    stack: ["React", "Vite", "TypeScript"],
  },
  {
    slug: "multi-tenant-backend",
    title: "Multi-tenant B2B backend",
    tagline: "One backend, many customers, several regions.",
    status: "Architecture",
    year: "2025",
    image: "/work/backend.svg",
    problem:
      "A B2B product had to serve companies in different regions while keeping every company's data separate.",
    built:
      "A Node.js and PostgreSQL architecture that resolves the tenant on every request and routes it to the right regional database.",
    decisions: [
      "The tenant is resolved once at the edge of the API, so business code never does tenant lookups.",
      "Data stays in the customer's region, which makes data residency questions easy to answer.",
      "One Prisma schema and one migration path across all regions.",
    ],
    outcome:
      "Onboarding a new customer is a configuration step rather than a new deployment. Used as the reference architecture for later products.",
    stack: ["Node.js", "PostgreSQL", "Prisma"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
