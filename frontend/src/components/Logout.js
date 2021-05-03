function Logout(props) {
    async function handleClick() {
        await fetch("/api/user/logout", {
            method: "POST",
        });
        props.handleSuccess();
    }

    return (
        <button className="logout" onClick={handleClick}>
            Logout
        </button>
    );
}

export default Logout;
