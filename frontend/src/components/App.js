import { useState } from "react";

import Quiz from "./Quiz";
import Login from "./Login";
import Logout from "./Logout";

async function getUserId() {
    const response = await fetch("/api/users/me");
    const { userId } = await response.json();
    return userId;
}

function App() {
    const [userId, setUserId] = useState(null);
    getUserId().then(setUserId);
    console.log(userId);

    function handleLogout() {
        setUserId(null);
    }

    if (userId) {
        return (
            <div>
                <Quiz userId={userId} />
                <Logout Logout handleSuccess={handleLogout} />
            </div>
        );
    } else {
        return <Login handleSuccess={setUserId} />;
    }
}

export default App;
