import { useEffect, useState } from "react";

import AnswerCard from "./AnswerCard";

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

    if (cardStack === null) {
        return <main id="answer-cards"></main>;
    } else if (cardStack.length === 0) {
        return (
            <main id="answer-cards">
                <span>No cards pending</span>
                <button onClick={props.onClickAddCards}>Add Cards</button>
            </main>
        );
    } else {
        return (
            <main id="answer-cards">
                <AnswerCard
                    cardData={cardStack[0]}
                    onFinished={handleCardFinished}
                    handleUnauth={props.handleUnauth}
                />
            </main>
        );
    }
}

export default Quiz;
