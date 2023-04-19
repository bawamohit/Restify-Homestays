import { useState, useEffect } from "react";

function Profile() {
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(false)
    const [status, setStatus] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/accounts/update-user/', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        }).then(response => response.json())
        .then(json => {
            setUser(json)
        })
    }, [refresh])

    
    const handleImages = (e) => {
        if (e.target.files) {
          setImage(...e.target.files)
        }
      };

    function handleSave() {
        var username = document.getElementById("username").value
        var first_name = document.getElementById("first-name").value
        var last_name = document.getElementById("last-name").value
        var email = document.getElementById("email").value
        var phone = document.getElementById("phone").value
        var img = image
        
        const infoStuff = new FormData();
        infoStuff.append('username', username);
        infoStuff.append('first_name', first_name);
        infoStuff.append('last_name', last_name);
        infoStuff.append('email', email);
        infoStuff.append('phoneNumber', phone);       
        infoStuff.append('avatars', img);

        console.log(img)

        fetch('http://localhost:8000/accounts/update-user/', {
        method: 'PUT',    
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken') 
                    },
            body: infoStuff
        }).then(response => response.json().then( json => {
            if (response.ok) {
                setStatus("Profile Saved")
                setRefresh(!refresh)
            }
            console.log(response)
        }))
    }

 
    return (<div className="container">
        <div className="text-center">
            <h2 className="py-4 text-secondary text-center">My Profile</h2>
            {edit ? <label className="btn btn-outline-primary" htmlFor="edit" onClick={handleSave}>Save</label> : 
                <label className="btn btn-outline-primary" htmlFor="edit">Edit</label>}
            <input type="checkbox" className="btn-check" id="edit" autoComplete="off" onChange={() => {setEdit(!edit)}}/>
        </div>
        
        <div className="d-flex justify-content-center gap-5 py-4">
            <div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    {edit ? <input type="text" className="form-control form-control-plaintext border" id="username" placeholder={user.username}></input>:
                    <input type="text" className="form-control form-control-plaintext" id="username" value={user.username} disabled></input>} 
                </div>
                <div className="form-group">
                    <label htmlFor="first-name">First Name:</label>
                    {edit ? <input type="text" className="form-control form-control-plaintext border" id="first-name" placeholder={user.first_name}></input>:
                    <input type="text" className="form-control form-control-plaintext" id="first-name" value={user.first_name} disabled></input>}
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name:</label>
                    {edit ? <input type="text" className="form-control form-control-plaintext border" id="last-name" placeholder={user.last_name}></input>:
                    <input type="text" className="form-control form-control-plaintext" id="last-name" value={user.last_name} disabled></input>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    {edit ? <input type="text" className="form-control form-control-plaintext border" id="email" placeholder={user.email}></input>:
                    <input type="text" className="form-control form-control-plaintext" id="email" value={user.email} disabled></input>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    {edit ? <input type="text" className="form-control form-control-plaintext border" id="phone" placeholder={user.phoneNumber}></input>:
                    <input type="text" className="form-control form-control-plaintext" id="phone" value={user.phoneNumber} disabled></input>}
                </div>
                <div className="form-group">
                <label htmlFor="image">Image:</label>
                {edit ? <input type="file" multiple className="form-control" id="image" onChange={handleImages}></input>:
                <input type="file" multiple className="form-control" id="image" onChange={handleImages} disabled></input>}
                </div>
                
            </div>
            <img src={user.avatars} alt="User" className="rounded-circle align-self-center" style={{}}></img>
        </div>
    </div>
    );
}

export default Profile;