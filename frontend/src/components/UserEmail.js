import { useState, useEffect } from "react";

function UserEmail() {
    const [email, setEmail] = useState("");
    useEffect(() => {
        fetch("/api/user/email")
            .then((response) => response.json())
            .then(({ email }) => setEmail(email));
    }, []);

    return <span>{email}</span>;
}

export default UserEmail;
