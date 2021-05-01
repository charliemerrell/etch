import CardContainer from "./CardContainer";
import { useState, useEffect } from "react";

function ViewAllCards(props) {
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        fetch("/api/cards?all=true").then((res) => {
            if (res.status === 401) {
                props.handleUnauth();
            } else {
                res.json().then(({ cards }) => setCardList(cards));
            }
        });
    }, [props]);

    return (
        <main id="all-cards">
            {cardList.map((card) => {
                return <CardContainer key={card.id} cardData={card} />;
            })}
        </main>
    );
}

export default ViewAllCards;
