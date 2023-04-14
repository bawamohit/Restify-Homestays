import { NavLink } from "react-router-dom";

function Navbar() {
    
    // GET DATA
    
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
        
        <div className="modal fade" id="login-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Log In</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="login-modal-email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="login-modal-email" placeholder="email@example.com" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="login-modal-password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="login-modal-password" placeholder="Password" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <div>Don't have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#signup-modal">Click here</a></div>
                        <NavLink to="/dashboard" className="btn btn-primary">Log In</NavLink>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="signup-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sign Up</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-fname" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="signup-modal-fname" placeholder="Joe" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-lname" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="signup-modal-lname" placeholder="Biden" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-phone" className="form-label">Phone</label>
                                <input type="phone" className="form-control" id="signup-modal-phone" placeholder="777-777-7777" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="signup-modal-email" placeholder="email@example.com" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="signup-modal-password" placeholder="Password" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <div>Already have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#login-modal">Click here</a></div>
                        <NavLink to="/dashboard" className="btn btn-primary">Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  export default Navbar;