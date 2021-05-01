import Card from "./Card";

function CardContainer(props) {
    return (
        <div className="card-container">
            <Card onClick={props.onFlipCard} cardData={props.cardData} />
            <button>Delete</button>
        </div>
    );
    // should include progress bar in this card container
}

export default CardContainer;
