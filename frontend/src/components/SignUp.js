import { useState } from "react";

function SignUp(props) {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");

    function handleInputChange(e, setter) {
        setter(e.target.value);
    }

    function passwordsMatch() {
        return password === password2;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordsMatch()) {
            const response = await fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (response.ok) {
                props.handleSuccess();
            } else {
                // TODO andle error
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="email"
                required
                onChange={(e) => handleInputChange(e, setEmail)}
                value={email}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => handleInputChange(e, setPassword)}
                minLength="8"
                required
                value={password}
            />
            <input
                type="password"
                placeholder="confirm password"
                onChange={(e) => handleInputChange(e, setPassword2)}
                minLength="8"
                required
                value={password2}
            />
            <input type="submit" value="Sign Up" />
        </form>
    );
}

export default SignUp;
