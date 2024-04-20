// type SubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
import { useEffect, useState } from "react";
import { CardData } from "./Card";
import closeModalIcon from '@/public/close-modal.svg';
import '@/app/styles/cards.css'

const initialCard = {
  id: '',
  pergunta: "",
  resposta: "",
} as const;

export default function CreateCardModal({
  handleSubmit,
  setCards,
  toggleShowModal,
}: {
  handleSubmit: any;
  setCards: any;
  toggleShowModal: any;
}): JSX.Element {
  const [currentCard, setCurrentCard] = useState<CardData>(initialCard);

  function changePerguntaValue(value: string): void {
    setCurrentCard({ ...currentCard, pergunta: value });
  }

  function changeRespostaValue(value: string): void {
    setCurrentCard({ ...currentCard, resposta: value });
  }

  // useEffect(() => {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.key === 'Escape') {
  //       setShowModal(false);
  //       toggleBlur();
  //       console.log('showModal is now false');      
  //     }
  //   })
  // }, [])

  return (
    <div id="new-card-modal">
      <img id='close-card-modal' src={closeModalIcon.src} alt="Close modal" title='Fechar' onClick={toggleShowModal} />
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
        <button type='button' onClick={() => handleSubmit(currentCard)}>
          Criar
        </button>
      </form>
    </div>
  );
}
