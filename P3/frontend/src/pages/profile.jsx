import { useState, useEffect } from "react";

function Profile() {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('http://localhost:8000/accounts/update-user', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        }).then(response => response.json())
        .then(json => {
            setUser(json)
        })
    }, [])

    return (<div className="container">
        <h2 className="py-4 text-secondary text-center">My Profile</h2>
        <div className="d-flex justify-content-center gap-5 py-4">
            <div>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control form-control-plaintext" id="username" placeholder={user.username} disabled></input>
                </div>
                <div class="form-group">
                    <label for="first-name">First Name:</label>
                    <input type="text" class="form-control form-control-plaintext" id="first-name" placeholder={user.first_name} disabled></input>
                </div>
                <div class="form-group">
                    <label for="last-name">Last Name:</label>
                    <input type="text" class="form-control form-control-plaintext" id="last-name" placeholder={user.last_name} disabled></input>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" class="form-control form-control-plaintext" id="email" placeholder={user.email} disabled></input>
                </div>
                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="text" class="form-control form-control-plaintext" id="phone" placeholder={user.phoneNumber} disabled></input>
                </div>
            </div>
            <img src={user.avatars} alt="User" className="rounded-circle align-self-center" style={{}}></img>
        </div>
    </div>
    );
}

export default Profile;