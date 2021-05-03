import { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import CardContainer from "./CardContainer";
import { PROGRESS_TRANSITION_MS } from "../constants";

function AnswerCard(props) {
    const [disclosed, setDisclosed] = useState(false);
    const [progress, setProgress] = useState(props.cardData.progress);
    useEffect(() => {
        setProgress(props.cardData.progress);
    }, [props.cardData.progress]);
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
            setProgress(Math.max(0, correct ? progress + 1 : progress - 2));
            setTimeout(() => {
                setDisclosed(false);
                props.onFinished();
            }, PROGRESS_TRANSITION_MS);
        }
    }

    return (
        <section className="answer-card">
            <CardContainer
                onFlipCard={() => setDisclosed(true)}
                cardData={props.cardData}
                handleUnauth={props.handleUnauth}
                handleDelete={props.onFinished}
                progress={progress}
            />
            <div className={"classify-answer" + (disclosed ? " ready" : "")}>
                <button
                    className="danger"
                    onClick={() => classifyAnswer(false)}
                >
                    <FaTimes />
                </button>
                <button
                    className="success"
                    onClick={() => classifyAnswer(true)}
                >
                    <FaCheck />
                </button>
            </div>
        </section>
    );
}

export default AnswerCard;
