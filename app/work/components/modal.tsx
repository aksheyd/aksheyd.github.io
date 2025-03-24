import { Project } from "../projects";

interface ModalProps {
  project: Project;
  onClose: () => void;
}

export default function Modal({ project, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <p className="text-gray-600">{project.desc}</p>
        <a href={project.link} className="text-blue-500 hover:underline mt-2 block">
          View Project
        </a>
        <button onClick={onClose} className="mt-4 bg-gray-300 px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}