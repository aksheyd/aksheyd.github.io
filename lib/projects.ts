// Define the structure for a project
interface Project {
  name: string;
  bio: string; // Short description or tech stack
  desc: string; // Longer description
  link?: string; // Primary link (live site, repo, etc.)
  repo?: string; // Git repo
  images: string[]; // Array of image paths (relative to /public)
}

// Array to hold your projects
const projects: Project[] = [
  {
    name: "Project Example 1",
    bio: "React, Next.js, Tailwind CSS",
    desc: "This is a detailed description of the first project, highlighting its features and the technologies used.",
    link: "/destroy-the-wormhole",
    images: ["/images/project1/image1.png", "/images/project1/image2.png"],
  },
  {
    name: "Project Example 2",
    bio: "Unity, C#",
    desc: "This is a game developed using Unity. It features...",
    link: "/legend-of-zelda",
    images: ["/images/project2/screenshot1.jpg"],
  },
  // Add more projects here following the same structure
];

export default projects;

export type { Project }; // Export the type for use elsewhere 