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
}: {
  projects: Project[];
  cards: CardData[];
  createNewProject: any;
}): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleShowModal = (): void => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* placeholder */}
      <h1>Project List</h1>
      {showModal && (
        <NewProjectModal
          handleShow={toggleShowModal}
          handleClick={createNewProject}
        />
      )}
      {projects.map((project) => {
        return (
          <div
            key={project.id}
            className="project"
          >
            <Link
              href={{
                pathname: `projects/${project.name}`,
                query: { id: project.id, name: project.name },
              }}
            >
              {project.name}
            </Link>
            <button>Delete Project (need to add function)</button>
          </div>
        );
      })}
      <button onClick={toggleShowModal}>{showModal ? 'Cancelar' : 'Criar Novo Projeto'}</button>
    </>
  );
}
