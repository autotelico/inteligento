"use client";
import { useState } from "react";
import Card, { CardData } from "../card/Card";
import NewProjectModal from "./NewProjectModal";
import "../../styles/projectList.css";
import Link from "next/link";

export interface Project {
  id: string;
  name: string;
  cards: CardData[];
}

export default function ProjectList({
  projects,
  cards,
  createNewProject,
  handleDelete,
}: {
  projects: Project[];
  cards: CardData[];
  createNewProject: any;
  handleDelete: any;
}): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleBlur = (): void => {
    document.querySelector('#blur')?.classList.toggle('hidden')
  }
  
  const toggleShowModal = (): void => {
    setShowModal(!showModal);
    toggleBlur();
  };

  return (
    <div id="project-container">
      <div id="blur" className="hidden"></div>
      {/* placeholder */}
      <h2>Project List</h2>
      {showModal && (
        <NewProjectModal
          handleShow={toggleShowModal}
          handleClick={createNewProject}
        />
      )}
      {projects.map((project) => {
        return (
          <div key={project.id} className="project">
            <p className="project-title" title='Ver detalhes'>
              <Link
                href={{
                  pathname: `projects/${project.name}`,
                  query: { id: project.id, name: project.name },
                }}
              >
                {project.name}
              </Link>
            </p>
            <button className='deletar-projeto-btn' onClick={() => handleDelete(project)}>
              Deletar
            </button>
          </div>
        );
      })}
      <button id="criar-novo-projeto-btn" onClick={toggleShowModal}>
        {showModal ? "Cancelar" : "Criar Novo Projeto"}
      </button>
    </div>
  );
}
