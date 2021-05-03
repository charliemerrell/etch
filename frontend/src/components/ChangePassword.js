import { useState } from "react";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    function handlePasswordChange(e, setter) {
        setter(e.target.value);
    }

    function passwordsMatch() {
        return newPassword === newPassword2;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordsMatch()) {
            const response = await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });
            if (response.ok) {
                // TODO confirm
            } else {
                // TODO andle error
            }
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
            <input type="submit" value="Submit" />
        </form>
    );
}

export default ChangePassword;
