function Navbar() {
    
    // GET DATA
    
    return (
        <nav class="navbar navbar-expand-md" style={{background: '#85bded'}}>
            <div class="container">
                <a href="./index.html" class="navbar-brand mb-0 h1" style={{color: 'white'}}>Restify</a>
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
    );
  }
  export default Navbar;