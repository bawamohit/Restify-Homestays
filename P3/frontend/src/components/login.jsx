import { NavLink } from "react-router-dom";
import { useState } from "react";

function Login(props) {
    const [error, setError] = useState("")

    function handleLogIn() {
        fetch(process.env.REACT_APP_BACKEND_API + "api/token/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById("login-modal-username").value,
                password: document.getElementById("login-modal-password").value
            })
        }).then(response => response.json().then(json => {
            if (response.ok) {
                document.getElementById('login-close').click()
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
        <div className="modal fade" id="login-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Log In</h5>
                        <button type="button" className="btn-close" id="login-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="login-modal-username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="login-modal-username" placeholder="Username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="login-modal-password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="login-modal-password" placeholder="Password" />
                            </div>
                        </form>
                        <p>{error}</p>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <div>Don't have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#signup-modal">Click here</a></div>
                        <button type="button" className="btn btn-primary" onClick={handleLogIn}>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;