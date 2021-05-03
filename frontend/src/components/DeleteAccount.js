import { useState } from "react";

function DeleteAccount(props) {
    const [password, setPassword] = useState("");

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("/api/user", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });
        if (response.ok) {
            // flash messsge?
            props.handleUnauth();
        } else {
            // TODO handle error if session expired or password wrong (RESPECTIVELY!)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="password"
                onChange={handlePasswordChange}
                minLength="8"
                required
                value={password}
            />
            <input type="submit" className="danger" value="Delete Account" />
        </form>
    );
}

export default DeleteAccount;
