import { MODES } from "../constants";
import { FaPlus, FaListUl, FaUserAlt, FaPlay } from "react-icons/fa";

class Button {
    constructor(idSuffix, innerHtml) {
        this.idSuffix = idSuffix;
        this.innerHtml = innerHtml;
    }
}

const buttonInfo = [];
buttonInfo[MODES.addCards] = new Button("add", <FaPlus />);
buttonInfo[MODES.viewAllCards] = new Button("view-all", <FaListUl />);
buttonInfo[MODES.answerCards] = new Button("answer", <FaPlay />);
buttonInfo[MODES.account] = new Button("account", <FaUserAlt />);

function Navbar(props) {
    function jsxForButton(mode) {
        // make this a method on Button?
        return (
            <button
                id={`open-${buttonInfo[mode].idSuffix}`}
                className={mode === props.mode ? "active" : ""}
                onClick={() => props.onClickMode(mode)}
            >
                {buttonInfo[mode].innerHtml}
            </button>
        );
    }

    return (
        <section id="navbar">
            {jsxForButton(MODES.account)}
            {jsxForButton(MODES.answerCards)}
            {jsxForButton(MODES.viewAllCards)}
            {jsxForButton(MODES.addCards)}
        </section>
    );
}

export default Navbar;
