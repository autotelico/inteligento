'use client'
import { useState } from 'react'
import '../../styles/globals.css'
import { Project } from '../project/ProjectList';

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
            <button onClick={changeShowAnswer}>Ver resposta</button>
            <button onClick={() => handleDelete(projectId, card)}>Deletar carta</button>
        </div>
    )    
}