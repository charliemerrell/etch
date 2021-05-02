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
                />
            </main>
        );
    }
}

export default Quiz;
