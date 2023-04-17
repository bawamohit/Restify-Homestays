import { useEffect, useState } from "react";
import '../style.css'

function UserRating() {

    const [users, setUsers] = useState([])
    const [loggedIn, setLoggedIn] = useState([])
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)

    useEffect(() => {
        var queryString = `accounts/view-comment-user/1?page=${page}`
        fetch('http://localhost:8000/' + queryString, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        })
            .then(response => response.json())
            .then(json => {
                setReviews([...json.results])
                setNext(json.next)
                setPrevious(json.previous)
            })
    }, [page])

    useEffect(() => {
        if (Object.keys(reviews).length !== 0) {
            fetch('http://localhost:8000/accounts/list-user/?page=' + reviews[0].user, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(response => response.json())
                .then(json => {
                    setUsers(json.results)
                })
        }
    }, [reviews])

    useEffect(() => {
        fetch('http://localhost:8000/accounts/see-logged-in-user', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        })
            .then(response => response.json())
            .then(json => {
                setLoggedIn(json)
            })
    }, [])

    return (
        <div>

            <div class="modal fade" id="guests-modal" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" style={{ color: '#85bded' }}>
                                <img src={loggedIn.avatars}
                                    class="profile1css img-fluid rounded-circle"></img>
                                &nbsp; {loggedIn.first_name}'s Ratings
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body justify-content-between">
                            <div class="card card-body border-0">
                                <div class="row">
                                    <div class="col-sm-2 col-3 p-0 ">

                                        {(() => {
                                            if (users.length !== 0) {
                                                return (
                                                    <img
                                                        class="profile1css img-fluid rounded-circle" src={users[0].avatars} />
                                                )
                                            }
                                        })()}


                                    </div>
                                    <div class="col-sm-10 col-9 p-0">
                                        <div class="bold">

                                            {(() => {
                                                if (users.length !== 0) {
                                                    // console.log(users[0][0].username)
                                                    return (

                                                        <div>  {users[0].first_name} {users[0].last_name}</div>
                                                    )
                                                }
                                            })()}


                                            {/* {users[0].first_name} */}
                                        </div>
                                        <div class="text-secondary">

                                            {reviews.map(review =>
                                                <div>Rating:  {review.rating} Stars</div>
                                            )}


                                        </div>
                                    </div>
                                </div>
                                <div class="row pb-3">
                                    {reviews.map(review =>
                                        <div>{review.body}</div>
                                    )}
                                </div>
                                <div class="row">

                                </div>
                            </div>

                            <div className="ms-auto me-auto" style={{ maxWidth: "700px" }}>
                                <div className="d-flex justify-content-between" style={{ maxWidth: "700px" }}>
                                    <button className="btn btn-secondary my-5" type="button" onClick={() => { if (previous) setPage(page - 1) }}>Previous Page</button>
                                    <button className="btn btn-secondary my-5" type="button" onClick={() => { if (next) setPage(page + 1) }}>Next Page</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRating;
