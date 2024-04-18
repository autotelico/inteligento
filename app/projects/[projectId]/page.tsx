"use client";
import CreateCardModal from "@/app/components/card/CreateCardModal";
import Card, { CardData } from "@/app/components/card/Card";
import { Project } from "@/app/components/project/ProjectList";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

export default function ProjectId({ params }: { params: any }): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentCards, setCurrentCards] = useState<CardData[]>([])
  const searchParams = useSearchParams();

  // Fetch selected project
  const storedProjects: Project[] = JSON.parse(
    localStorage.getItem("storedProjects")!
  );
  const selectedProject: Project = storedProjects.find(
    (storedProject) => storedProject.name === searchParams.get("name")
  )!;

  console.log("selectedProject:", selectedProject);

  useEffect(() => {
    if (!currentCards.length) {
      setCurrentCards(selectedProject.cards)
    }
  }, [])

  // FUNCTIONS
  const updateLocalStorage = (projArray: Project[]): void => {
    localStorage.setItem('storedProjects', JSON.stringify(projArray))
  }

  function addToLocalStorage(chosenProject: Project, newCard: CardData): void {
    if (localStorage.getItem("storedProjects")) {
      const storedProjects: Project[] = JSON.parse(
        localStorage.getItem("storedProjects")!
      );
      const existingCard: CardData | undefined = chosenProject.cards.find(card => card.pergunta === newCard.pergunta)
      if (!existingCard) {
        chosenProject.cards.push(newCard)
        const filteredProjects: Project[] = storedProjects.filter(storedProj => storedProj.id !== chosenProject.id)
        localStorage.setItem('storedProjects', JSON.stringify([...filteredProjects, chosenProject]))
      }
      
      storedProjects.find(storedProj => storedProj.name === chosenProject.name)
    }
  }

  function addCardToProject(newCard: CardData): void {
    newCard.id = uuidv4()
    setCurrentCards([...currentCards, newCard])
    addToLocalStorage(selectedProject, newCard);
  }

  function deleteCardFromProject(targetProjectId: string, cardToDelete: CardData): void {
    // Finds the localStorage project we want to delete, then updates its cards
    const foundProject: Project = storedProjects.find(storedProj => storedProj.id === targetProjectId)!
    const updatedCards: CardData[] = foundProject.cards.filter(card => card.id !== cardToDelete.id)
    foundProject.cards = updatedCards
    const newProjectArray = storedProjects.filter(storedProj => storedProj.id !== targetProjectId)
    setCurrentCards(foundProject.cards)
    updateLocalStorage([...newProjectArray, foundProject])
  }

  return (
    <>
      {showModal && <CreateCardModal handleSubmit={addCardToProject} setCards={setCurrentCards}/>}
      <h1>Project ID page: {searchParams.get("name")}</h1>
      {selectedProject.cards ? (
        currentCards.map((card) => (
          <Card key={card.id} projectId={selectedProject.id} card={card} handleDelete={deleteCardFromProject}/>
        ))
      ) : (
        <p>No cards created yet.</p>
      )}
      <button onClick={() => setShowModal(!showModal)}>
        {showModal ? "Cancel" : "Create New Card"}
      </button>
      <Link href="/"><p>Voltar</p></Link>
    </>
  );
}
