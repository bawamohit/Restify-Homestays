import { useState, useEffect } from "react";

function Comment(props) {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('http://localhost:8000/accounts/view-user/' + props.uid, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            }).then(response => response.json())
            .then(json => setUser(json))
    }, [props.uid])

    var padding = 0
    if (props.position > 0) {
        padding = 5
    }

    return (
        <div className={`px-${padding}`}>
            <div className="d-flex gap-3">
                <img src={user.avatars} alt="User" className="rounded-circle img-fluid" style={{maxHeight:'40px'}}></img>
                <div>
                    <div>{user.first_name} {user.last_name}</div>
                    {props.rating ? (<p>Rating: {props.rating} stars</p>) : ("")}
                    {props.uid === props.hostid ? (<p>(host)</p>) : ("")}
                </div>
            </div>
            <p>{props.body}</p>   
        </div>
    )
}

export default Comment;