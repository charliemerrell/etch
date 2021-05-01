import { MODES } from "../constants";

class Button {
    constructor(idSuffix, innerHtml) {
        this.idSuffix = idSuffix;
        this.innerHtml = innerHtml;
    }
}

const buttonInfo = [];
buttonInfo[MODES.addCards] = new Button("add", "Add");
buttonInfo[MODES.viewAllCards] = new Button("view-all", "View");
buttonInfo[MODES.answerCards] = new Button("answer", "Answer");
buttonInfo[MODES.account] = new Button("account", "Account");

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
        <section>
            {jsxForButton(MODES.account)}
            {jsxForButton(MODES.answerCards)}
            {jsxForButton(MODES.viewAllCards)}
            {jsxForButton(MODES.addCards)}
        </section>
    );
}

export default Navbar;
