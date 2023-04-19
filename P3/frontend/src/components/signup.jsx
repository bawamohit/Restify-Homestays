import { NavLink } from "react-router-dom";
import { useState } from "react";

function Signup(props) {
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [fnameError, setFnameError] = useState("")
    const [lnameError, setLnameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    function handleSignUp() {       
        var username = document.getElementById("signup-modal-username").value
        var password = document.getElementById("signup-modal-password").value

        fetch(process.env.REACT_APP_BACKEND_API + "accounts/create-user/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username, 
                password: password,
                first_name: document.getElementById("signup-modal-fname").value,
                last_name: document.getElementById("signup-modal-lname").value,
                email: document.getElementById("signup-modal-email").value,
                phoneNumber: document.getElementById("signup-modal-phone").value
            })
        }).then(response => response.json().then(json => {
            if (response.ok) {
                document.getElementById('signup-close').click()
                handleLogIn(username, password)
            }
            else {
                json.username ? setUsernameError(json.username.join()) : setUsernameError("")
                json.password ? setPasswordError(json.password.join()) : setPasswordError("")
                json.first_name ? setFnameError(json.first_name.join()) : setFnameError("")
                json.last_name ? setLnameError(json.last_name.join()) : setLnameError("")
                json.email ? setEmailError(json.email.join()) : setEmailError("")
                json.phoneNumber ? setPhoneError(json.phoneNumber.join()) : setPhoneError("")
            }
        }))
    }

    function handleLogIn(username, password) {
        fetch(process.env.REACT_APP_BACKEND_API + "api/token/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username, 
                password: password
            })
        }).then(response => response.json().then(json => {
            if (response.ok) {
                document.getElementById('signup-close').click()
                localStorage.setItem('accessToken', json.access)
                localStorage.setItem('refreshToken', json.refresh)
                props.callback(true)
            }
            else {
                console.log(json.detail)
            }
        }))
    }
    
    return (
        <div className="modal fade" id="signup-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sign Up</h5>
                        <button type="button" className="btn-close" id="signup-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="signup-modal-username" placeholder="Username" />
                                <p className="error">{usernameError}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-fname" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="signup-modal-fname" placeholder="Joe" />
                                <p className="error">{fnameError}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-lname" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="signup-modal-lname" placeholder="Biden" />
                                <p className="error">{lnameError}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-phone" className="form-label">Phone</label>
                                <input type="phone" className="form-control" id="signup-modal-phone" placeholder="777-777-7777" />
                                <p className="error">{phoneError}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="signup-modal-email" placeholder="email@example.com" />
                                <p className="error">{emailError}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-modal-password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="signup-modal-password" placeholder="Password" />
                                <p className="error">{passwordError}</p>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <div>Already have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#login-modal">Click here</a></div>
                        <button type="button" className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;