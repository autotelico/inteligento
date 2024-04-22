'use client'
import { useState } from 'react'
import '../../styles/globals.css'

export interface CardData {
    id: string;
    pergunta: string;
    resposta: string;
}

export default function Card({card, projectId, handleDelete}: {
    card: CardData,
    projectId: string,
    handleDelete: any,
}): JSX.Element {
    const [showAnswer, setShowAnswer] = useState<boolean>(false)

    function changeShowAnswer(): void {
        setShowAnswer(!showAnswer)
    }
    
    return (
        <div className="card">
            <p className="card-pergunta">{card.pergunta}</p>
            {showAnswer && <p className="card-resposta">{card.resposta}</p>}
            <button className='ver-resposta-btn' onClick={changeShowAnswer}>{showAnswer ? 'Ocultar resposta' : 'Ver resposta'}</button>
            <button className='deletar-card-btn' onClick={() => handleDelete(projectId, card)}>Deletar carta</button>
        </div>
    )    
}