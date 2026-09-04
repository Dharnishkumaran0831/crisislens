export const SITE_CONFIG = {
  name: "CrisisLens & Dharnishkumaran R Developer Platform",
  description: "Official repository and live deployment platform for CrisisLens — Emergency Management & AI Intelligence Platform.",
  url: "https://crisislens-emergency-jzd5.bolt.host",
  ogImage: "/careerpilot_mockup.jpg",
  author: {
    name: "Dharnishkumaran R",
    degree: "B.Tech Information Technology",
    college: "V.S.B. Engineering College",
    github: "https://github.com/Dharnishkumaran0831",
    linkedin: "https://www.linkedin.com/in/dharnishkumaran-r-019986322/",
    leetcode: "https://leetcode.com/u/Dharnishkumaranrdk/",
    email: "dharnishkumaranrdk@gmail.com",
    location: "Tiruppur, Tamil Nadu, India",
  },
  links: {
    githubRepo: "https://github.com/Dharnishkumaran0831/crisislens",
    liveDemo: "https://crisislens-emergency-jzd5.bolt.host",
    insurAi: "https://github.com/Dharnishkumaran0831/InsurAI-Project",
    medichainAi: "https://github.com/Dharnishkumaran0831/medichain-ai",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
