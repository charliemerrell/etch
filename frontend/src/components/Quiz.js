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
    }, []);

    function handleCardFinished() {
        setCardStack(cardStack.slice(1));
    }

    if (cardStack === null) {
        return <div id="answer-cards"></div>;
    } else if (cardStack.length === 0) {
        return (
            <div id="answer-cards">
                <span>No cards pending</span>
                <button onClick={props.onClickAddCards}>Add Cards</button>
            </div>
        );
    } else {
        return (
            <div id="answer-cards">
                <AnswerCard
                    cardData={cardStack[0]}
                    onFinished={handleCardFinished}
                    handleUnauth={props.handleUnauth}
                />
            </div>
        );
    }
}

export default Quiz;
