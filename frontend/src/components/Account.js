import ChangePassword from "./ChangePassword";
import Logout from "./Logout";
import UserEmail from "./UserEmail";
import DeleteAccount from "./DeleteAccount";

function Account(props) {
    return (
        <main id="account">
            <UserEmail handleUnauth={props.handleUnauth} />
            <Logout handleSuccess={props.handleUnauth} />
            <ChangePassword handleUnauth={props.handleUnauth} />
            <DeleteAccount handleUnauth={props.handleUnauth} />
        </main>
    );
}

export default Account;
