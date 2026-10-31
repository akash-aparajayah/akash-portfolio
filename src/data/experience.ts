export type Role = {
  title: string;
  start: string; // e.g. "Apr 2025"
  end: string; // e.g. "Mar 2026" or "Present"
  duration?: string; // leave out for the current role so it never goes stale
  points: string[];
  skills: string[];
};

export type Company = {
  company: string;
  since: string; // start year, shown in the timeline circle
  location: string;
  type: string;
  mode: string;
  duration?: string; // total time at the company
  current?: boolean;
  roles: Role[];
};

// Newest first.
export const experience: Company[] = [
  {
    company: "Aparajayah Technologies Pvt Ltd",
    since: "2026",
    location: "Madurai, Tamil Nadu, India",
    type: "Full-time",
    mode: "On-site",
    current: true,
    roles: [
      {
        title: "Full Stack Engineer",
        start: "Apr 2026",
        end: "Present",
        points: [
          "Develop full-stack applications that improve user experience and system reliability.",
          "Design REST APIs and manage databases such as MySQL and MongoDB.",
          "Deploy applications on AWS.",
          "Work with cross-functional teams to deliver end-to-end solutions while optimizing application performance.",
        ],
        skills: ["React.js", "Bootstrap", "MySQL", "MongoDB", "AWS"],
      },
    ],
  },
  {
    company: "ABShrms",
    since: "2024",
    location: "Chennai, Tamil Nadu, India",
    type: "Full-time",
    mode: "On-site",
    duration: "2 yrs 2 mos",
    roles: [
      {
        title: "Senior Software Developer",
        start: "Apr 2025",
        end: "Mar 2026",
        duration: "1 yr",
        points: [
          "Led backend development and design of scalable HRMS modules.",
          "Developed and optimized APIs with Node.js, NestJS and SQL databases to improve system performance.",
          "Worked with clients to deliver tailored business solutions while mentoring junior developers.",
        ],
        skills: ["Node.js", "NestJS", "PostgreSQL", "Analytical Skills"],
      },
      {
        title: "Associate Software Developer",
        start: "Feb 2024",
        end: "Apr 2025",
        duration: "1 yr 3 mos",
        points: [
          "Developed and maintained key features of the HRMS product, improving user experience and functionality.",
          "Gathered requirements from clients to build solutions that fit their needs.",
          "Implemented data security measures and resolved production bugs, which significantly improved system stability.",
        ],
        skills: ["Client Relations", "Bug Tracking"],
      },
    ],
  },
  {
    company: "Ruah Tech Solutions, Australia",
    since: "2023",
    location: "Chennai, Tamil Nadu, India",
    type: "Full-time",
    mode: "On-site",
    duration: "1 yr 1 mo",
    roles: [
      {
        title: "Software Developer",
        start: "Feb 2023",
        end: "Feb 2024",
        points: [
          "Developed backend services with Node.js, Express.js and MongoDB to improve application performance.",
          "Implemented secure authentication, including OAuth, to protect user data.",
          "Designed and documented REST APIs for web applications, which made integration smoother.",
        ],
        skills: ["Node.js", "Express.js", "MongoDB", "OAuth", "REST APIs"],
      },
    ],
  },
];