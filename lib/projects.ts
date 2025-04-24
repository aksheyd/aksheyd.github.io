// Define the structure for a project
interface Project {
  name: string;
  desc: string; 
  tech: string[],
  link?: string; 
  repo?: string; 
}

// TODO: add and update projects from old repo
const projects: Project[] = [
  {
    name: "destroy-the-wormhole",
    desc: "This is a detailed description of the first project, highlighting its features and the technologies used.",
    tech: ["Unity", "C#"],
    link: "/destroy-the-wormhole",
  },
  {
    name: "legend-of-zelda",
    desc: "This is a game developed using Unity. It features...",
    tech: ["Unity", "C#"],
    link: "/legend-of-zelda",
  },
];

export default projects;

export type { Project };