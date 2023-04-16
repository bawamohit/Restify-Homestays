import { useEffect, useState } from "react";

var token = localStorage.getItem('accessToken')

const ShowNotifications = () => {
    const [notif, setNotif] = useState([]);
    const [query, setQuery] = useState({notif: [], page : 1});
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        if (query.page === 1){
            fetch(process.env.REACT_APP_BACKEND_API + 'properties/notification/list/', {
                headers: {'Authorization': 'Bearer ' + token}
            })
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
                console.log("yay");
                setNotif(json.results);
                setTotalPages(Math.ceil(json.count / 2));
            }).catch(error => {
                console.log("no");
                console.log(error);
            })
        } else {
            fetch(process.env.REACT_APP_BACKEND_API + 'properties/notification/list/?page=' + query.page, {
                headers: {'Authorization': 'Bearer ' + token}
            })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                  return response.json();
                } else if (response.status === 404) {
                  throw new Error('Requested resource not found');
                } else {
                  throw new Error('Server error');
                }
              })
            .then(json => {
                console.log("yay");
                setNotif(json.results);
                setTotalPages(Math.ceil(json.count / 2));
            }).catch(error => {
                console.log("no");
                console.log(error);
            })
        }

    }, [query])

    return (
        <div class="container text-center">
            <h2 class="pt-5 pb-5 text-secondary text-center">Notifications</h2>
            {
            notif.map(notif => (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {notif.message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => 
                    fetch(process.env.REACT_APP_BACKEND_API +  'properties/notification/${notif.id}', {
                        method: 'POST',
                        headers: {'Authorization': 'Bearer ' + token.access_token},
                        body: JSON.stringify({
                            key1: 'value1',
                            key2: 'value2'
                        })
                        })
                        .then(response => {
                        // handle response
                        })
                        .catch(error => {
                        // handle error
                        })}></button>
                </div>
            ))}
            <p>
                {query.page > 1 
                ? <button onClick={() => setQuery({
                    ...query, page: query.page - 1
                })}>Previous</button>
                :<></>
                }
                {query.page < totalPages 
                ? <button onClick={() => setQuery({
                    ...query, page: query.page + 1
                })}>Next</button>
                :<></>
                }
            </p>
            <p>Page {query.page} out of {totalPages}.</p>
        </div>
    );
}
export default ShowNotifications;

//list of notifications