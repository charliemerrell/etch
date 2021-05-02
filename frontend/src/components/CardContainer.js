import Card from "./Card";
import { FaTrashAlt } from "react-icons/fa";

function CardContainer(props) {
    async function onDelete() {
        const res = await fetch(`/api/cards/${props.cardData.id}`, {
            method: "DELETE",
        });
        if (res.status === 401) {
            props.handleUnauth();
        } else {
            props.handleDelete();
        }
    }

    return (
        <div className="card-container">
            <Card onClick={props.onFlipCard} cardData={props.cardData} />
            <button onClick={onDelete}>
                <FaTrashAlt />
            </button>
        </div>
    );
    // should include progress bar in this card container
}

export default CardContainer;
