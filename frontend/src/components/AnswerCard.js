import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
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
                <button onClick={() => classifyAnswer(false)}>
                    <FaTimes />
                </button>
                <button onClick={() => classifyAnswer(true)}>
                    <FaCheck />
                </button>
            </div>
        </section>
    );
}

export default AnswerCard;
