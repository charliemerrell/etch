import { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";

const MODES = Object.freeze({
    login: 1,
    signup: 2,
});

function LoginOrSignUp(props) {
    const [mode, setMode] = useState(MODES.login);

    if (mode === MODES.login) {
        return (
            <div id="login-or-signup">
                <Login handleSuccess={props.handleSuccess} />
                <button onClick={() => setMode(MODES.signup)}>Sign Up</button>
            </div>
        );
    } else {
        return (
            <div id="login-or-signup">
                <SignUp handleSuccess={props.handleSuccess} />
                <button onClick={() => setMode(MODES.login)}>Login</button>
            </div>
        );
    }
}

export default LoginOrSignUp;
