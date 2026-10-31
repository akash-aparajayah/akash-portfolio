export type Experience = {
  role: string;
  org: string;
  period: string;
  year: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Independent software developer",
    org: "Self-employed",
    period: "2025 to present",
    year: "2025",
    points: [
      "Design and build full-stack products, from data model to user interface.",
      "Build React and TypeScript front ends with shared theming and reusable components.",
      "Design multi-tenant, multi-region backends on Node.js and PostgreSQL.",
    ],
  },
];
