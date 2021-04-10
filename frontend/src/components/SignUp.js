import { useState } from "react";

function SignUp(props) {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handlePassword2Change(e) {
        setPassword2(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function passwordsMatch() {
        return password === password2;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordsMatch()) {
            const response = await fetch("/api/users/signup", {
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
            const { userId } = await response.json();
            props.handleSuccess(userId);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="email"
                required
                onChange={handleEmailChange}
                value={email}
            />
            <input
                type="password"
                placeholder="password"
                onChange={handlePasswordChange}
                minlength="8"
                required
                value={password}
            />
            <input
                type="password"
                placeholder="confirm password"
                onChange={handlePassword2Change}
                minlength="8"
                required
                value={password2}
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default SignUp;
