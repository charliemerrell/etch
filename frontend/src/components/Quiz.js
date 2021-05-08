import { useEffect, useState } from "react";

import AnswerCard from "./AnswerCard";
import { PROGRESS_TRANSITION_MS } from "../constants";

function Quiz(props) {
    const [cardStack, setCardStack] = useState(null);

    useEffect(() => {
        fetch("/api/cards").then((res) => {
            if (res.status === 401) {
                props.handleUnauth();
            } else {
                res.json().then(({ cards }) => setCardStack(cards));
            }
        });
    }, [props]);

    function handleCardFinished() {
        setCardStack(cardStack.slice(1));
    }

    async function handleAnswer(cardId) {
        const response = await fetch(`/api/cards/${cardId}`);
        const updatedCard = await response.json();
        // this is slow with slow internet
        // maybe create a utility function that is shared between
        // front and backend which takes card + answer and returns
        // new card states
        setCardStack([updatedCard, ...cardStack.slice(1)]);
        setTimeout(handleCardFinished, PROGRESS_TRANSITION_MS);
    }

    // we can do better
    if (cardStack === null) {
        return <main id="quiz" className="center"></main>;
    } else if (cardStack.length === 0) {
        return (
            <main id="quiz" className="center">
                <span>You're all caught up!</span>
            </main>
        );
    } else {
        return (
            <main id="quiz" className="center">
                <AnswerCard
                    cardData={cardStack[0]}
                    onFinished={handleCardFinished}
                    handleUnauth={props.handleUnauth}
                    onAnswer={handleAnswer}
                />
            </main>
        );
    }
}

export default Quiz;
