// Update the Project interface
interface Project {
  name: string;
  desc: string;
  tech: string[];
  date: string;
  link?: string;
  repo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    name: "whats-up",
    desc: "WhatsUp is a web application that makes local ordinances and laws accessible and interactive for community members. Created as part of the Data Driven Hackathon at the University of Michigan, Ann Arbor on 3/22/25. Features: Django backend deployed on Fly.io with LiteFS replication, Selenium/BeautifulSoup4 scraping pipeline, and an LLM-powered interaction system.",
    date: "March 2025",
    repo: "https://github.com/aksheyd/whatsup",
    tech: ["Django", "Python", "SQLite", "Fly.io", "Selenium", "BeautifulSoup"],
  },
  {
    name: "easy-train",
    desc: "Learning about training LLMs with SFT and RL (Tinker, Modal, WanDB, vLLM, etc).",
    date: "November 2025",
    tech: ["Tinker", "Modal", "WandB", "vLLM"],
    repo: "https://github.com/aksheyd/easy-train",
    featured: true,
  },
  {
    name: "duelers-providence",
    desc: "Collaborated with a 5-person student team in Unity using C#. Focused on level design, environment details, lighting, lore, and trailer creation. Click the link for more details and downloads.",
    date: "May 2025",
    link: "/providence",
    tech: ["Unity", "C#"],
    featured: true,
  },
  {
    name: "nba-mlp",
    desc: "Custom neural network to predict NBA championship winners based on team statistics. Features manual backpropagation implementation with 97.49% training accuracy and 96.25% validation accuracy on 797 team-seasons from 1996-2024.",
    date: "2024",
    repo: "https://github.com/aksheyd/NBAMLP",
    tech: ["Python", "NumPy", "Neural Networks"],
    featured: true,
  },
  {
    name: "deep-ocean-research",
    desc: "AI-powered system generating scientifically plausible deep-sea species hypotheses using orchestrated CrewAI agents, research citation graphs, and real scientific literature from OpenAlex and Exa. Features React dashboard with live session tracking and citation DAG visualization.",
    date: "2024",
    repo: "https://github.com/aksheyd/deep-ocean-research",
    tech: ["Python", "React", "CrewAI", "OpenAlex", "GraphML"],
  },
  {
    name: "destroy-the-wormhole",
    desc: "Developed the game in two weeks with Unity using C#. Click the link to play the game online!",
    date: "February 2025",
    link: "/destroy-the-wormhole",
    tech: ["Unity", "C#"],
  },
  {
    name: "legend-of-zelda",
    desc: "Collaborated with a peer to develop the game in Unity using C#. The game features the first dungeon from the original NES version. Click the link to play the game online!",
    date: "January 2025",
    link: "/legend-of-zelda",
    tech: ["Unity", "C#", "Photoshop"],
  },
  {
    name: "gemini-ai-asl-translator",
    desc: "Collaborated with 2 team members to create a React and Flask web app to allow users to record videos signing and translate American Sign Language (ASL) into English via Gemini 1.5’s Video API. Submitted as part of MHacks x Google Hackathon",
    date: "March 2024",
    link: "https://devpost.com/software/gemini-asl-translator",
    tech: ["Gemini", "Flask", "React"],
  },
  {
    name: "personal-portfolio",
    desc: "Created using Next.js, React, and Typescript, featuring GSAP, tsParticles, Tailwind CSS, and more to come! Deployed via Github Pages.",
    date: "November 2024 - March 2024",
    link: "https://aksheyd.github.io",
    repo: "https://github.com/aksheyd/aksheyd.github.io",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
];

export default projects;

export type { Project };
