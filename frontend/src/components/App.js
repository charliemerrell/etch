import { useState } from "react";

import Quiz from "./Quiz";
import AddCards from "./AddCards";
import ViewAllCards from "./ViewAllCards";
import LoginOrSignUp from "./LoginOrSignUp";
import Navbar from "./Navbar";
import Account from "./Account";

import { MODES } from "../constants";

function App() {
    const [authenticated, setAuthenticated] = useState(true);
    const [mode, setMode] = useState(MODES.answerCards);

    function jsxForMode() {
        switch (mode) {
            case MODES.viewAllCards:
                return <ViewAllCards />;
            case MODES.addCards:
                return (
                    <AddCards handleUnauth={() => setAuthenticated(false)} />
                );
            case MODES.account:
                return <Account />;
            default:
                return <Quiz handleUnauth={() => setAuthenticated(false)} />;
        }
    }

    if (authenticated) {
        return (
            <div>
                {jsxForMode()}
                <Navbar onClickMode={(mode) => setMode(mode)} mode={mode} />
            </div>
        );
    } else {
        return <LoginOrSignUp handleSuccess={() => setAuthenticated(true)} />;
    }
}

export default App;
