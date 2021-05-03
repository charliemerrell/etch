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
                <footer>
                    Don't have an account yet?
                    <button onClick={() => setMode(MODES.signup)}>
                        Sign Up
                    </button>
                </footer>
            </div>
        );
    } else {
        return (
            <div id="login-or-signup">
                <SignUp handleSuccess={props.handleSuccess} />
                <footer>
                    Already have an account?
                    <button onClick={() => setMode(MODES.login)}>Login</button>
                </footer>
            </div>
        );
    }
}

export default LoginOrSignUp;
