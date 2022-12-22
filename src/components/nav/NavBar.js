import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import myLogo from "./scalelogo.svg"



export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar-container">
            <nav className="nav-right">
                <Link className="nav-right" to="/crags">Explore</Link>
                <Link className="nav-right" to="/profile">Profile</Link>
            </nav>
            <img className="nav-logo" src={myLogo} alt={"Chatt.Scale Logo"} />
            <nav className="nav-left">
                <Link className="nav-left" to="/home">Home</Link>


                {
                    localStorage.getItem("scale_user")
                        ?
                        <Link className="nav-left" to="" onClick={() => {
                            localStorage.removeItem("scale_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>

                        : ""
                }
            </nav>
        </nav>
    )
}


// once MVP is met, rearrange and make it so the home and explore page can be accessed by anyone, profile will be redirected to login page if not logged in 