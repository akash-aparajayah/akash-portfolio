export type SkillLevel = { level: string; note: string; items: string[] };

export const skills: SkillLevel[] = [
  {
    level: "Daily",
    note: "What I build with every week",
    items: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma ORM"],
  },
  {
    level: "Working",
    note: "Comfortable in production",
    items: ["Next.js", "Fastify", "NestJS", "Vite", "REST API design", "Multi-tenant design"],
  },
  {
    level: "Familiar",
    note: "Used, still learning",
    items: ["Docker", "GitHub Actions", "Vercel"],
  },
];
