import { useState } from "react";

function AddCards(props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    function onChangeQuestion(e) {
        setQuestion(e.target.value);
    }

    function onChangeAnswer(e) {
        setAnswer(e.target.value);
    }

    async function onSubmitCard(e) {
        e.preventDefault();
        const response = await fetch("/api/cards", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question, answer }),
        });
        if (response.status === 401) {
            props.handleUnauth();
        } else {
            setQuestion("");
            setAnswer("");
        }
    }

    return (
        <main id="add-cards" className="center">
            <form onSubmit={onSubmitCard}>
                <input
                    className="question"
                    placeholder="question"
                    onChange={onChangeQuestion}
                    required
                    value={question}
                />
                <input
                    className="answer"
                    placeholder="answer"
                    onChange={onChangeAnswer}
                    required
                    value={answer}
                />
                <button type="submit">Add</button>
            </form>
        </main>
    );
}

export default AddCards;
