"use client";

import { useState } from "react";
import ProjectCard from "./components/projectcard";
import Modal from "./components/modal";
import projects, { Project } from "./projects";
import Divider from "../extras/divider";

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen p-8 bg-gray-100" id="Work">
      <Divider/>
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} proj={project} onClick={setSelectedProject} />
        ))}
      </div>

      {selectedProject && <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}