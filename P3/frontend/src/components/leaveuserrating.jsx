import { useEffect, useState } from "react";
import '../style.css'

function LeaveUserRating(props) {

    const [rating, setRating] = useState(5)
    const [body, setBody] = useState("")
    const [loggedIn, setLoggedIn] = useState([])

    const handleSubmit = (e) => {
        // console.log("hi")
        e.preventDefault()

        const commentStuff = {
            // user: loggedIn,
            body,
            rating,
            replyingTo: null
        }

        fetch('http://localhost:8000/accounts/create-comment-user/' + props.id + '/', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify(commentStuff)
        })
        // .then(response => response.json())
        .then(response => console.log(response))
        
    }

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
            
            <div class="modal fade" id="host-rate-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Rate This User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body justify-content-between">
                            <div class="mb-3">
                                What is your rating?
                            </div>
                            <form class="pb-2" onSubmit={handleSubmit}>
                                <div class="btn-group" role="group">
                                    <select class="form-select text-muted"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>


                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Leave a comment</label>

                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}></textarea>

                                </div>

                                <button class="btn btn-success" type="submit">Confirm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LeaveUserRating;