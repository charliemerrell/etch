import { useState } from "react";

function SignUp(props) {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function handleInputChange(e, setter) {
        setter(e.target.value);
    }

    function passwordsMatch() {
        return password === password2;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
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
                setError("Email already taken");
            }
        } else {
            setError("Passwords don't match");
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
            <span className="danger">{error}</span>
            <button type="submit" className="success">
                Sign Up
            </button>
        </form>
    );
}

export default SignUp;
