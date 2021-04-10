import { useState } from "react";

import AnswerCards from "./AnswerCards";
import AddCards from "./AddCards";
import LoginOrSignUp from "./LoginOrSignUp";
import Logout from "./Logout";

const MODES = Object.freeze({
    answerCards: 1,
    addCards: 2,
});

function App() {
    const [authenticated, setAuthenticated] = useState(true);
    const [mode, setMode] = useState(MODES.answerCards);

    if (authenticated) {
        return (
            <div>
                {mode === MODES.answerCards ? (
                    <AnswerCards
                        handleUnauth={() => setAuthenticated(false)}
                        onClickAddCards={() => {
                            setMode(MODES.addCards);
                        }}
                    />
                ) : (
                    <AddCards
                        handleUnauth={() => setAuthenticated(false)}
                        onClickAnswerCards={() => {
                            setMode(MODES.answerCards);
                        }}
                    />
                )}
                <Logout handleSuccess={() => setAuthenticated(false)} />
            </div>
        );
    } else {
        return <LoginOrSignUp handleSuccess={() => setAuthenticated(true)} />;
    }
}

export default App;
