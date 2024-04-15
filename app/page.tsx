"use client";
import { useState, useEffect, use } from "react";
import { v4 as uuidv4 } from "uuid"; // entender porque o id não atualiza
import Header from "./components/Header";
import CreateCardForm from "./components/card/CreateCardForm";
import Card from "./components/card/Card";
import { CardData } from "./components/card/Card";

export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    if (localStorage.getItem("storedCards")) {
      setCards(JSON.parse(localStorage.getItem("storedCards")!));
      console.log(
        "localStorage:",
        JSON.parse(localStorage.getItem("storedCards")!)
      );
    } else {
      console.log("No cards stored.");
    }
  }, []);

  function addToCards(newCard: CardData): void {
    newCard.id = uuidv4();
    setCards((prevCards) => {
      localStorage.setItem(
        "storedCards",
        JSON.stringify([...prevCards, newCard])
      );
      return [...prevCards, newCard];
    });
    console.log("newCard: ", newCard);
    console.log("cards: ", cards);

    const allInputFields = document.querySelectorAll("input");
    allInputFields.forEach((input) => (input.value = ""));
  }

  function removeCard(cardToRemove: CardData): void {
    const cardsFiltrados = cards.filter((card) => card.id !== cardToRemove.id);
    console.log("card deletado");
    localStorage.setItem("storedCards", JSON.stringify([...cardsFiltrados]));
    setCards(cardsFiltrados);
  }

  function deleteAllCards(): void {
    const question = confirm("Tem certeza de que quer deletar todo o deck?");
    question && setCards([]);
    localStorage.removeItem("storedCards");
  }

  return (
    <>
      <Header />
      <CreateCardForm handleSubmit={addToCards} />
      <div id="cards-container">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleDelete={removeCard} />
        ))}
      </div>
      <button type="button" onClick={deleteAllCards}>
        DELETAR DECK
      </button>
    </>
  );
}
