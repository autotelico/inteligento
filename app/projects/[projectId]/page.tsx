"use client";
import CreateCardModal from "@/app/components/card/CreateCardModal";
import Card, { CardData } from "@/app/components/card/Card";
import { Project } from "@/app/components/project/ProjectList";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toggleBlur } from "@/app/components/project/ProjectList";

export default function ProjectId({ params }: { params: any }): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  const searchParams = useSearchParams();

  // Fetch selected project
  const storedProjects: Project[] = JSON.parse(
    localStorage.getItem("storedProjects")!
  );
  const selectedProject: Project = storedProjects.find(
    (storedProject) => storedProject.name === searchParams.get("name")
  )!;

  console.log("selectedProject:", selectedProject);

  function toggleBlur(): void {
    document.querySelector(".blur")!.classList.toggle("hidden");
  }

  useEffect(() => {
    // set value to currentCards
    if (!currentCards.length) {
      setCurrentCards(selectedProject.cards);
    }
  }, []);

  // FUNCTIONS
  const updateLocalStorage = (projArray: Project[]): void => {
    localStorage.setItem("storedProjects", JSON.stringify(projArray));
  };

  const clearInputs = (): void => {
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => (input.value = ""));
  };

  const validateCardInfo = (cardToValidate: CardData): boolean => {
    const perguntaExists = selectedProject.cards.find(
      (card) => card.pergunta === cardToValidate.pergunta
    );
    if (perguntaExists) {
      console.log("Pergunta já existe em uma carta");
      return false;
    }
    const respostaExists = selectedProject.cards.find(
      (card) => card.resposta === cardToValidate.resposta
    );
    if (respostaExists) {
      console.log("Resposta já existe em uma carta");
      return false;
    }
    return true;
  };

  function addToLocalStorage(chosenProject: Project, newCard: CardData): void {
    if (localStorage.getItem("storedProjects")) {
      const storedProjects: Project[] = JSON.parse(
        localStorage.getItem("storedProjects")!
      );
      const existingCard: CardData | undefined = chosenProject.cards.find(
        (card) => card.pergunta === newCard.pergunta
      );
      if (!existingCard) {
        chosenProject.cards.push(newCard);
        const filteredProjects: Project[] = storedProjects.filter(
          (storedProj) => storedProj.id !== chosenProject.id
        );
        localStorage.setItem(
          "storedProjects",
          JSON.stringify([...filteredProjects, chosenProject])
        );
      }
      storedProjects.find(
        (storedProj) => storedProj.name === chosenProject.name
      );
      clearInputs();
    }
  }

  function addCardToProject(newCard: CardData): void {
    const cardValid = validateCardInfo(newCard);
    if (!cardValid) throw new Error("Card validation failed.");
    newCard.id = uuidv4();
    setCurrentCards([...currentCards, newCard]);
    addToLocalStorage(selectedProject, newCard);
  }

  function deleteCardFromProject(
    targetProjectId: string,
    cardToDelete: CardData
  ): void {
    // Confirm if the user wants to delete
    const question = confirm("Tem certeza de que quer deletar esta carta?");
    if (question) {
      // Finds the localStorage project we want to delete, then updates its cards
      const foundProject: Project = storedProjects.find(
        (storedProj) => storedProj.id === targetProjectId
      )!;
      const updatedCards: CardData[] = foundProject.cards.filter(
        (card) => card.id !== cardToDelete.id
      );
      foundProject.cards = updatedCards;
      const newProjectArray = storedProjects.filter(
        (storedProj) => storedProj.id !== targetProjectId
      );
      setCurrentCards(foundProject.cards);
      updateLocalStorage([...newProjectArray, foundProject]);
    }
  }

  const handleShowModal = (): void => {
    setShowModal(!showModal);
    toggleBlur();
  };

  return (
    <div id="cards-container">
      <div className="blur hidden"></div>
      {showModal && (
        <CreateCardModal
          handleSubmit={addCardToProject}
          setCards={setCurrentCards}
          toggleShowModal={handleShowModal}
        />
      )}
      <h1>Project ID page: {searchParams.get("name")}</h1>
      {!!currentCards.length ? (
        currentCards.map((card) => (
          <Card
            key={card.id}
            projectId={selectedProject.id}
            card={card}
            handleDelete={deleteCardFromProject}
          />
        ))
      ) : (
        <p>Nenhum cartão para mostrar ainda.</p>
      )}
      <button onClick={handleShowModal}>
        {showModal ? "Cancelar" : "Criar Novo Cartão"}
      </button>
      <Link href="/">
        <p>Voltar</p>
      </Link>
    </div>
  );
}
