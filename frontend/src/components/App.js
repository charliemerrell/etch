import { useState } from "react";

import Quiz from "./Quiz";
import LoginOrSignUp from "./LoginOrSignUp";
import Logout from "./Logout";

async function getUserId() {
    const response = await fetch("/api/users/me");
    const { userId } = await response.json();
    return userId;
}

function App() {
    const [userId, setUserId] = useState(null);
    getUserId().then(setUserId);

    function handleLogout() {
        setUserId(null);
    }

    if (userId) {
        return (
            <div>
                <Quiz userId={userId} />
                <Logout handleSuccess={handleLogout} />
            </div>
        );
    } else {
        return <LoginOrSignUp handleSuccess={setUserId} />;
    }
}

export default App;
