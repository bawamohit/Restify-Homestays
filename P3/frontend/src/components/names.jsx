import { useEffect, useState } from "react";
var token = localStorage.getItem('accessToken')
function Names(props) {
    const [user, setUser] = useState([]);
    const user_id = props.user_id;

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_API + 'accounts/view-user/' + user_id, {headers: { 'Authorization': 'Bearer ' + token }})
        .then(response => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 404) {
              throw new Error('Requested resource not found');
            } else {
              throw new Error('Server error');
            }
          })
        .then(json => {
            setUser(json);
        }).catch(error => {
            console.log(error);
        })
    }, [props.user_id])

    return ( <span>{user.first_name} {user.last_name}</span>
    );
}
export default Names;