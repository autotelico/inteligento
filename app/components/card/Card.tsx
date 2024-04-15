'use client'
import { useState } from 'react'
import '../../globals.css'

export interface CardData {
    id: string;
    pergunta: string;
    resposta: string;
}

export default function Card({card}: {
    card: CardData,
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
        </div>
    )    
}