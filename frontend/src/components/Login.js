import { useState } from "react";

function Login(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleInputChange(e, setter) {
        setter(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("/api/user/login", {
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
            // TODO handle error
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="email"
                required
                onChange={(e) => handleInputChange(e, setEmail)}
                value={email}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => handleInputChange(e, setPassword)}
                value={password}
                required
            />
            <input type="submit" value="Login" />
        </form>
    );
}

export default Login;
