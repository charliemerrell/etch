import CardContainer from "./CardContainer";
import { useState, useEffect } from "react";

function ViewAllCards(props) {
    const [cardList, setCardList] = useState([]);

    function fetchAllCards() {
        fetch("/api/cards?all=true").then((res) => {
            if (res.status === 401) {
                props.handleUnauth();
            } else {
                res.json().then(({ cards }) => setCardList(cards));
            }
        });
    }

    useEffect(fetchAllCards, [props]);

    return (
        <main id="all-cards">
            {cardList.map((card) => {
                return (
                    <CardContainer
                        key={card.id}
                        cardData={card}
                        handleUnauth={props.handleUnauth}
                        handleDelete={fetchAllCards}
                        progress={card.progress}
                    />
                );
            })}
        </main>
    );
}

export default ViewAllCards;
