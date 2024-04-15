// type SubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
import { useState } from "react";
import { CardData } from "./Card";

const initialCard = {
  id: '',
  pergunta: "",
  resposta: "",
} as const;

export default function CreateCardForm({
  handleSubmit,
}: {
  handleSubmit: any;
}): JSX.Element {
  const [currentCard, setCurrentCard] = useState<CardData>(initialCard);

  function changePerguntaValue(value: string): void {
    setCurrentCard({ ...currentCard, pergunta: value });
  }

  function changeRespostaValue(value: string): void {
    setCurrentCard({ ...currentCard, resposta: value });
  }

  return (
    <form>
      <label htmlFor="pergunta">Pergunta:</label>
      <input
        type="text"
        id="pergunta"
        onChange={(e) => changePerguntaValue(e.target.value)}
      />
      <label htmlFor="resposta">Resposta:</label>
      <input
        type="text"
        id="resposta"
        onChange={(e) => changeRespostaValue(e.target.value)}
      />
      <button type="button" onClick={() => handleSubmit(currentCard)}>
        Criar
      </button>
    </form>
  );
}
