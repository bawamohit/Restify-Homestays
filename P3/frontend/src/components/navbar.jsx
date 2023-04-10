import { NavLink } from "react-router-dom";

function Navbar() {
    
    // GET DATA
    
    return (<div>
        <nav class="navbar navbar-expand-md" style={{background: '#85bded'}}>
            <div class="container">
                <NavLink to="/" class="navbar-brand mb-0 h1" style={{color: 'white'}}>Restify</NavLink>
                <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex-grow-0" id="nav">
                <ul class="navbar-nav my-2 my-lg-0">
                    <li class="nav-item px-2">
                    <a class="nav-link text-light" href="#" data-bs-toggle="modal" data-bs-target="#login-modal">Log In</a>
                    </li>
                    <li class="nav-item px-2">
                    <a class="btn btn-light text-muted" href="#" data-bs-toggle="modal" data-bs-target="#signup-modal">Sign Up</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        
        <div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Log In</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="modal-email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="modal-email" placeholder="email@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="modal-password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="modal-password" placeholder="Password" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <div>Don't have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#signup-modal">Click here</a></div>
                        <NavLink to="/dashboard" class="btn btn-primary">Log In</NavLink>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="signup-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Sign Up</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="modal-fname" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="modal-fname" placeholder="Joe" />
                            </div>
                            <div class="mb-3">
                                <label for="modal-lname" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="modal-lname" placeholder="Biden" />
                            </div>
                            <div class="mb-3">
                                <label for="modal-phone" class="form-label">Phone</label>
                                <input type="phone" class="form-control" id="modal-phone" placeholder="777-777-7777" />
                            </div>
                            <div class="mb-3">
                                <label for="modal-email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="modal-email" placeholder="email@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="modal-password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="modal-password" placeholder="Password" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <div>Already have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#login-modal">Click here</a></div>
                        <NavLink to="/dashboard" class="btn btn-primary">Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  export default Navbar;