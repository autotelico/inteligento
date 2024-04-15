"use client";
import { useState, useEffect, use } from "react";
import { v4 as uuidv4 } from "uuid"; // entender porque o id não atualiza
import Header from "./components/Header";
import CreateCardForm from "./components/card/CreateCardForm";
import Card from "./components/card/Card";
import { CardData } from "./components/card/Card";

export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);

  function addToCards(newCard: CardData): void {
    newCard.id = uuidv4();
    setCards(prevCards => [...prevCards, newCard]);
    console.log('newCard: ', newCard);
    console.log('cards: ', cards);

    const allInputFields = document.querySelectorAll('input')
    allInputFields.forEach(input => input.value = '')
  }

  function saveToLocalStorage(): void {
    localStorage.setItem('cards', JSON.stringify(cards))
  }


  useEffect(() => {
    if (!cards.length) {
      // const storedCards = JSON.parse(localStorage.getItem("storedCards"));
    }
  }, []);

  return (
    <>
      <Header />
      <CreateCardForm
        handleSubmit={addToCards}
      />
      {cards.map((card) => (
        <Card key={card.pergunta} card={card} />
      ))}
      <button type='button'>Salvar</button>
    </>
  );
}
