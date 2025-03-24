import { Project } from "../projects";

interface ProjectCardProps {
  proj: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ proj, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={() => onClick(proj)}
      className="bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-lg font-semibold">{proj.name}</h2>
      <p className="text-sm text-gray-500">{proj.bio}</p>
      <a href={proj.link} target="_blank" className="text-blue-500 hover:underline text-sm">
        View Project
        </a>
    </div>
  );
}