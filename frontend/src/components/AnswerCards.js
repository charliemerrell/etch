import { useEffect, useState } from "react";

import Card from "./Card";

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
        return <div></div>;
    } else if (cardStack.length === 0) {
        return <div>empty</div>;
    } else {
        return (
            <div id="answer-cards">
                <Card
                    id={cardStack[0].id}
                    question={cardStack[0].question}
                    answer={cardStack[0].answer}
                    revealed={false}
                    onFinished={handleCardFinished}
                />
                <button onClick={props.onClickAddCards}>Add Cards</button>
            </div>
        );
    }
}

export default Quiz;
