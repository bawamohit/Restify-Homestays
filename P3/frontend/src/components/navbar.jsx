import { useState } from "react";
import { NavLink } from "react-router-dom";

import Login from "./login";
import Signup from "./signup";

function Navbar(props) {
    return (<div>
        <nav className="navbar navbar-expand-md" style={{background: '#85bded'}}>
            <div className="container">
                <NavLink to="/" className="navbar-brand mb-0 h1" style={{color: 'white'}}>Restify</NavLink>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0" id="nav">
                <ul className="navbar-nav my-2 my-lg-0">
                    <li className="nav-item px-2">
                    <a className="nav-link text-light" href="#" data-bs-toggle="modal" data-bs-target="#login-modal">Log In</a>
                    </li>
                    <li className="nav-item px-2">
                    <a className="btn btn-light text-muted" href="#" data-bs-toggle="modal" data-bs-target="#signup-modal">Sign Up</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        
        <Login callback={props.callback}/>

        <Signup callback={props.callback}/>
        
    </div>
    );
    
  }
  export default Navbar;