import ChangePassword from "./ChangePassword";
import Logout from "./Logout";

function Account(props) {
    return (
        <>
            <Logout handleSuccess={props.handleLogout} />
            <ChangePassword />
        </>
    );
}

export default Account;
