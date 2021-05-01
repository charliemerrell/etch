import { useState } from "react";

function Card(props) {
    const [showingQuestion, setShowingQuestion] = useState(true);
    function handleClick() {
        setShowingQuestion(!showingQuestion);
        props.onClick && props.onClick();
    }
    return (
        <span
            className="card"
            role="button"
            aria-pressed={!showingQuestion}
            onClick={handleClick}
        >
            {showingQuestion ? props.cardData.question : props.cardData.answer}
        </span>
    );
}

export default Card;
