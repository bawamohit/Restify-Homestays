import { useState, useEffect } from "react";

function Profile() {
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8000/accounts/update-user', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        }).then(response => response.json())
        .then(json => {
            setUser(json)
        })
    }, [])

    function handleSave() {
        console.log('save')
    }
 
    return (<div className="container">
        <h2 className="py-4 text-secondary text-center">My Profile</h2>
        <input type="checkbox" className="btn-check" id="edit" autoComplete="off" onChange={() => {setEdit(!edit)}}/>
        {edit ? <label className="btn btn-outline-primary" htmlFor="edit" onClick={handleSave}>Save</label> : 
            <label className="btn btn-outline-primary" htmlFor="edit">Edit</label>}
        <div className="d-flex justify-content-center gap-5 py-4">
            <div>
                <div class="form-group">
                    <label for="username">Username:</label>
                    {edit ? <input type="text" class="form-control form-control-plaintext border" id="username" placeholder={user.username}></input>:
                    <input type="text" class="form-control form-control-plaintext" id="username" value={user.username} disabled></input>} 
                </div>
                <div class="form-group">
                    <label for="first-name">First Name:</label>
                    {edit ? <input type="text" class="form-control form-control-plaintext border" id="first-name" value={user.first_name}></input>:
                    <input type="text" class="form-control form-control-plaintext" id="first-name" value={user.first_name} disabled></input>}
                </div>
                <div class="form-group">
                    <label for="last-name">Last Name:</label>
                    {edit ? <input type="text" class="form-control form-control-plaintext border" id="last-name" value={user.last_name}></input>:
                    <input type="text" class="form-control form-control-plaintext" id="last-name" value={user.last_name} disabled></input>}
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    {edit ? <input type="text" class="form-control form-control-plaintext border" id="email" value={user.email}></input>:
                    <input type="text" class="form-control form-control-plaintext" id="email" value={user.email} disabled></input>}
                </div>
                <div class="form-group">
                    <label for="phone">Phone:</label>
                    {edit ? <input type="text" class="form-control form-control-plaintext border" id="phone" value={user.phoneNumber}></input>:
                    <input type="text" class="form-control form-control-plaintext" id="phone" value={user.phoneNumber} disabled></input>}
                </div>
            </div>
            <img src={user.avatars} alt="User" className="rounded-circle align-self-center" style={{}}></img>
        </div>
    </div>
    );
}

export default Profile;