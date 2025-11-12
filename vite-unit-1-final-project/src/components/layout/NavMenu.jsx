
import {Link} from "react-router";

const NavMenu = () => {
    return (
        <div className="nav-menu">
            <Link className="link" to="/">
                Home
            </Link>
            <Link className="link" to="/volunteerevents">
                Volunteer
            </Link>
            <Link className="link" to="/about">
                About
            </Link>
        </div>
    );
};

export default NavMenu;

