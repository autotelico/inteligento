"use client";
import { useState } from "react";
import closeModalIcon from "../../../public/close-modal.svg";
import { Project } from "./ProjectList";
import { v4 as uuidv4 } from "uuid";

export default function NewProjectModal({
  handleShow,
  handleClick,
}: {
  handleShow: any;
  handleClick: any;
}): JSX.Element {
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    name: "",
    cards: [],
  });

  const createNewProject = (): void => {
    const projectName: string =
      document.querySelector<HTMLInputElement>("#project-name")!.value;
    const myProject: Project = {
      id: uuidv4(),
      name: projectName,
      cards: [],
    };
    setNewProject(myProject);
    handleClick(myProject);
  };

  return (
    <div id="new-project-modal">
      <img
        id="close-modal"
        onClick={handleShow}
        src={closeModalIcon.src}
        alt="Close Modal"
        title="Close Modal"
      />
      <label htmlFor="project-name">Nome do projeto:</label>
      <input type="text" id="project-name" placeholder="Exemplo: Anatomia" />
      <button type="button" onClick={createNewProject}>
        Criar Projeto
      </button>
    </div>
  );
}
