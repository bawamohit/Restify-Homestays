import { useEffect, useState } from "react";

var token = localStorage.getItem('accessToken')

const ShowNotifications = () => {
    const [notif, setNotif] = useState([]);
    const [query, setQuery] = useState({notif: [], page : 1});
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)

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
                setNotif(json.results);
                setNext(json.next)
                setPrevious(json.previous)
            }).catch(error => {
                console.log(error);
            })
        } else {
            fetch(process.env.REACT_APP_BACKEND_API + 'properties/notification/list/?page=' + query.page, {
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
                setNotif(json.results);
                setNext(json.next)
                setPrevious(json.previous)
            }).catch(error => {
                console.log(error);
            })
        }

    }, [query])

    return (
        <div class="container text-center">
            <h2 className="py-4 text-secondary text-center">Notifications</h2>
            {
            notif.map(notif => (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {notif.message}
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => 
                    fetch(process.env.REACT_APP_BACKEND_API +  'properties/notification/' + notif.id, {
                        headers: {'Authorization': 'Bearer ' + token},
                        })
                        .then(response => {
                            setQuery({...query, page: query.page})
                        })
                        .catch(error => {
                        // handle error
                        })}></button>
                </div>
            ))}
            {/* <p>
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
            <p>Page {query.page} out of {totalPages}.</p> */}
            <div className="ms-auto me-auto" style={{maxWidth: "700px"}}>
                <div className="d-flex justify-content-between" style={{ maxWidth: "700px" }}>
                    {previous ? <button className="btn btn-secondary my-5" type="button" onClick={() => { setQuery({ search: query.search, page: query.page - 1 }) }}>Previous Page</button> : 
                        <button className="btn btn-outline-secondary my-5" type="button" disabled>Previous Page</button>}
                    {next ? <button className="btn btn-secondary my-5" type="button" onClick={() => { setQuery({ search: query.search, page: query.page + 1 }) }}>Next Page</button> :
                        <button className="btn btn-outline-secondary my-5" type="button" disabled>Next Page</button>}
                </div>
            </div>
        </div>
    );
}
export default ShowNotifications;

//list of notifications