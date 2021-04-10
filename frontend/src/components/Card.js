import { useState, useEffect } from "react";

function Card(props) {
    const [revealed, setRevelead] = useState(props.revealed);

    useEffect(() => {
        setRevelead(props.revealed);
    }, [props.revealed]);

    async function markCard(correct) {
        await fetch(`/api/cards/${props.id}/answer`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correct,
            }),
        });
        setRevelead(false);
        props.onFinished();
    }

    return (
        <div className="card">
            <span className="question">{props.question}</span>
            <span className="answer" hidden={!revealed}>
                {props.answer}
            </span>
            {revealed ? (
                <div class="answers">
                    <button onClick={() => markCard(true)}>Correct</button>
                    <button onClick={() => markCard(false)}>Incorrect</button>
                </div>
            ) : (
                <button onClick={() => setRevelead(true)}>Show Answer</button>
            )}
            <button>Delete</button>
        </div>
    );
}

export default Card;
