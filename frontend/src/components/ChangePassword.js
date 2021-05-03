import { useState } from "react";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [message, setMessage] = useState({
        text: "",
        class: "",
    });

    function handlePasswordChange(e, setter) {
        setter(e.target.value);
    }

    function passwordsMatch() {
        return newPassword === newPassword2;
    }

    function clearAllInputs() {
        setOldPassword("");
        setNewPassword("");
        setNewPassword2("");
    }

    function clearMessage() {
        setMessage({
            text: "",
            class: "",
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        clearMessage();
        if (passwordsMatch()) {
            const response = await fetch("/api/user", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });
            if (response.ok) {
                setMessage({
                    text: "Password changed",
                    class: "success",
                });
                clearAllInputs();
                setTimeout(clearMessage, 2000);
            } else {
                setMessage({
                    text: "Password incorrect",
                    class: "danger",
                });
            }
        } else {
            setMessage({
                text: "Passwords don't match",
                class: "danger",
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="Current password"
                onChange={(e) => handlePasswordChange(e, setOldPassword)}
                minLength="8"
                required
                value={oldPassword}
            />
            <input
                type="password"
                placeholder="New password"
                onChange={(e) => handlePasswordChange(e, setNewPassword)}
                minLength="8"
                required
                value={newPassword}
            />
            <input
                type="password"
                placeholder="Confirm new"
                onChange={(e) => handlePasswordChange(e, setNewPassword2)}
                minLength="8"
                required
                value={newPassword2}
            />
            <span className={message.class}>{message.text}</span>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default ChangePassword;
