import { useState, useEffect } from "react";

function UserEmail() {
    const [email, setEmail] = useState("...loading");
    useEffect(() => {
        fetch("/api/user/email")
            .then((response) => response.json())
            .then(({ email }) => setEmail(email));
    }, []);

    return <p>{email}</p>;
}

export default UserEmail;
