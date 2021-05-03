import ChangePassword from "./ChangePassword";
import Logout from "./Logout";
import UserEmail from "./UserEmail";
import DeleteAccount from "./DeleteAccount";

function Account(props) {
    return (
        <main id="account">
            <section id="basics-section">
                <UserEmail handleUnauth={props.handleUnauth} />
                <Logout handleSuccess={props.handleUnauth} />
            </section>
            <hr />
            <ChangePassword handleUnauth={props.handleUnauth} />
            <hr />
            <DeleteAccount handleUnauth={props.handleUnauth} />
        </main>
    );
}

export default Account;
