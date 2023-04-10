import { NavLink } from "react-router-dom"

function UserNavbar() {
    
    // GET DATA
    
    return (
        <nav class="navbar navbar-expand-md" style={{background: '#85bded'}}>
            <div class="container">
                <NavLink to="/">Restify</NavLink>
                <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex-grow-0" id="nav">
                    <ul class="navbar-nav my-2 my-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Stay</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink to="/stay/accepted" class="dropdown-item">Upcoming Stays</NavLink></li>
                                <li><NavLink to="/stay/pending" class="dropdown-item">Pending Requests</NavLink></li>
                                <li><NavLink to="/stay/past" class="dropdown-item">Past Stays</NavLink></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Host</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink to="/host/properties" class="dropdown-item">Properties</NavLink></li>
                                <li><NavLink to="/host/accepted" class="dropdown-item">Upcoming Guests</NavLink></li>
                                <li><NavLink to="/host/pending" class="dropdown-item">Pending Guest Requests</NavLink></li>
                                <li><NavLink to="/host/past" class="dropdown-item">Past Guests</NavLink></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink to="/account/profile" class="dropdown-item">Profile</NavLink></li>
                                <li><NavLink to="/account/notifications" class="dropdown-item">Notifications</NavLink></li>
                                <li><NavLink to="/index" class="dropdown-item">Log Out</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
  export default UserNavbar;