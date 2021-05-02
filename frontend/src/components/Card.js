import { useState, useEffect } from "react";

function Card(props) {
    const [showingQuestion, setShowingQuestion] = useState(true);
    useEffect(() => {
        setShowingQuestion(true);
    }, [props.cardData]);
    function handleClick() {
        setShowingQuestion(!showingQuestion);
        props.onClick && props.onClick();
    }
    return (
        <div
            className="card center"
            role="button"
            aria-pressed={!showingQuestion}
            onClick={handleClick}
        >
            {showingQuestion ? props.cardData.question : props.cardData.answer}
        </div>
    );
}

export default Card;
