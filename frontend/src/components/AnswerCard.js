import { useState } from "react";
import CardContainer from "./CardContainer";

function AnswerCard(props) {
    const [disclosed, setDisclosed] = useState(false);

    async function classifyAnswer(correct) {
        const response = await fetch(`/api/cards/${props.cardData.id}/answer`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correct,
            }),
        });
        if (response.status === 401) {
            props.handleUnauth();
        } else {
            setDisclosed(false);
            props.onFinished();
        }
    }

    return (
        <section className="answer-card">
            <CardContainer
                onFlipCard={() => setDisclosed(true)}
                cardData={props.cardData}
                handleUnauth={props.handleUnauth}
                handleDelete={props.onFinished}
            />
            <div className={"classify-answer" + disclosed ? " ready" : ""}>
                <button onClick={() => classifyAnswer(true)}>Correct</button>
                <button onClick={() => classifyAnswer(false)}>Incorrect</button>
            </div>
        </section>
    );
}

export default AnswerCard;
