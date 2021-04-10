import React, { useState } from "react";

function App() {
    const [userId, setUserId] = useState(null);
    fetch("/api/users/me").then((resp) => {});
    return <div className="App"></div>;
}

export default App;
