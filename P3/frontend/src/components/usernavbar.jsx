import { NavLink } from "react-router-dom"

function UserNavbar(props) {
    
    function handleLogOut() {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        props.callback(false)
    }
    
    return (
        <nav className="navbar navbar-expand-md" style={{background: '#85bded'}}>
            <div className="container">
                <NavLink to="/" className="navbar-brand mb-0 h1" style={{color: 'white'}}>Restify</NavLink>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0" id="nav">
                    <ul className="navbar-nav my-2 my-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style={{color: 'white'}} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Stay</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink to="/reservations/stay" className="dropdown-item">Reservations</NavLink></li>
                                {/* <li><NavLink to="/stay/pending" className="dropdown-item">Pending Requests</NavLink></li>
                                <li><NavLink to="/stay/past" className="dropdown-item">Past Stays</NavLink></li> */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style={{color: 'white'}} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Host</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink to="/properties/host" className="dropdown-item">Properties</NavLink></li>
                                <li><NavLink to="/reservations/host" className="dropdown-item">Reservations</NavLink></li>
                                {/* <li><NavLink to="/host/pending" className="dropdown-item">Pending Guest Requests</NavLink></li>
                                <li><NavLink to="/host/past" className="dropdown-item">Past Guests</NavLink></li> */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" style={{color: 'white'}} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink to="/account/profile" className="dropdown-item">Profile</NavLink></li>
                                <li><NavLink to="/account/notifications" className="dropdown-item">Notifications</NavLink></li>
                                <li><a to="/" className="dropdown-item" onClick={handleLogOut}>Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
  export default UserNavbar;