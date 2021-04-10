import { useState } from "react";

function Login(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("/api/users/login", {
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="email"
                required
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="password"
                onChange={handlePasswordChange}
                required
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Login;
