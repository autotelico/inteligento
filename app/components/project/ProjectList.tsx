"use client";
import { useState } from "react";
import Card, { CardData } from "../card/Card";
import NewProjectModal from "./NewProjectModal";
import '../../styles/projectList.css'

export interface Project {
  id: string;
  name: string;
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

  const listProjectCards = (selectedProject: Project): void => {
    const projectCards = cards.filter((card) => card.id === selectedProject.id);
    projectCards.map((projectCard) => {
      <Card card={projectCard} handleDelete={"a"} />;
    });
  };

  const toggleShowModal = (): void => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* placeholder */}
      <h1>Project List</h1>
      {showModal && <NewProjectModal handleShow={toggleShowModal} handleClick={createNewProject}/>}
      {projects.map((project) => {
        return (
          <div key={project.id} className="project" onClick={() => listProjectCards(project)}>
            {project.name}
          </div>
        );
      })}
      <button onClick={toggleShowModal}>Criar Novo Projeto</button>
    </>
  );
}
