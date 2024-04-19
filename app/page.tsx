"use client";
import { useState, useEffect, use } from "react";
import { v4 as uuidv4 } from "uuid"; // entender porque o id não atualiza
import Card from "./components/card/Card";
import { CardData } from "./components/card/Card";
import ProjectList, { Project } from "./components/project/ProjectList";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    // Get project ids form localStorage to reference cards
    // to list out
    if (localStorage.getItem("storedProjects")) {
      const storedProjects = JSON.parse(
        localStorage.getItem("storedProjects")!
      );
      setProjects(storedProjects);
      console.log("storedProjects: ", storedProjects);
    } else {
      console.log("No projects stored.");
    }

    // Get cards from localStorage
    if (localStorage.getItem("storedCards")) {
      const storedCards = JSON.parse(localStorage.getItem("storedCards")!);
      setCards(storedCards);
      console.log("storedCards:", storedCards);
    } else {
      console.log("No cards stored.");
    }
  }, []);

  // Project-related functions
  const updateLocalStorage = (projArray: Project[]): void => {
    localStorage.setItem('storedProjects', JSON.stringify(projArray))
  }

  const addNewProject = (newProject: Project): void => {
    const newProjectList = [...projects, newProject];
    setProjects(newProjectList);
    addToLocalStorage(newProject)
  };

  const removeProject = (projectToDelete: Project): void => {
    const filteredProjects = projects.filter(project => project.id !== projectToDelete.id)
    setProjects(filteredProjects)
    updateLocalStorage([...filteredProjects]) 
  }

  // I'll probably remove this

  // Card-related functions
  // function addToCards(newCard: CardData): void {
  //   newCard.id = uuidv4();
  //   setCards((prevCards) => {
  //     localStorage.setItem(
  //       "storedCards",
  //       JSON.stringify([...prevCards, newCard])
  //     );
  //     return [...prevCards, newCard];
  //   });
  //   console.log("newCard: ", newCard);
  //   console.log("cards: ", cards);

  //   const allInputFields = document.querySelectorAll("input");
  //   allInputFields.forEach((input) => (input.value = ""));
  // }


  // function removeCard(cardToRemove: CardData): void {
  //   const cardsFiltrados = cards.filter((card) => card.id !== cardToRemove.id);
  //   console.log("card deletado");
  //   localStorage.setItem("storedCards", JSON.stringify([...cardsFiltrados]));
  //   setCards(cardsFiltrados);
  // }

  function deleteAllCards(): void {
    if (localStorage.getItem("storedProjects")) {
      const question = confirm(
        "Tem certeza de que quer deletar todo os projetos? \nISSO IRÁ DELETAR TUDO."
      );
      if (question) {
        setCards([]);
        localStorage.removeItem("storedProjects");
        setProjects([])
      }
    } else {
      alert("Não há projetos para deletar.");
    }
  }

  // Update localStorage
  function addToLocalStorage(newProject: Project): void {
    // if newProject doesn't already exist:
    const newProjectExists = projects.some(project => project.id === newProject.id)
    if (!newProjectExists) {
      localStorage.setItem("storedProjects", JSON.stringify([...projects, newProject]));
    } else {
      const filteredProjects = projects.filter(project => project.id !== newProject.id)
      filteredProjects.push(newProject)
      localStorage.setItem('storedProjects', JSON.stringify(filteredProjects))
    }
  }

  return (
    <>
      <div id="projects-container">
        <ProjectList
          projects={projects}
          cards={cards}
          createNewProject={addNewProject}
          handleDelete={removeProject}
        />
      </div>
      <button type="button" onClick={deleteAllCards}>
        DELETAR TUDO
      </button>
    </>
  );
}
