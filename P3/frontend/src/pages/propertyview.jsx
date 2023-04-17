import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Carousel from "../components/carousel";
import '../style.css'

function PropertyView() {
    const { pid } = useParams()
    const [property, setProperty] = useState({})
    const [host, setHost] = useState({})
    const [reviews, setReviews] = useState([])
    const [user, setUser] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch('http://localhost:8000/properties/property-view/' + pid, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        }).then(response => response.json())
            .then(json => setProperty(json))

        fetch('http://localhost:8000/accounts/view-comment-property/' + pid + `?page=${page}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        }).then(response => response.json())
            .then(json => {
                setReviews(json)
                // console.log(json)
            })
    }, [pid, page])

    useEffect(() => {
        if (Object.keys(property).length !== 0) {
            fetch('http://localhost:8000/accounts/view-user/' + property.owner, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(response => response.json())
                .then(json => setHost(json))
        }
    }, [property])

    useEffect(() => {
        if (Object.keys(reviews).length !== 0) {
            fetch('http://localhost:8000/accounts/list-user/?page=' + reviews[0][0].user, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(response => response.json())
                .then(json => {
                    // console.log(json)
                    setUser(json.results)
                })
        }
    }, [reviews])

    let reviewArray = []
    if (reviews.length !== 0) {
        reviewArray = reviews[0]
    }

    /*     if (reviewArray.length !== 0) {
            console.log(reviewArray)
        } */


    if (Object.keys(user).length !== 0) {
        console.log(user[0])
    }

    let isGuest = true
    if (reviewArray.length !== 0) {
        for (let i = 0; i < reviewArray.length; i++) {
            if (isGuest) {
                if (Object.keys(user).length !== 0) {
                    reviewArray[i].first_name = user[0].first_name
                    reviewArray[i].last_name = user[0].last_name

                    if (reviewArray[i].rating !== null) {
                        console.log(reviews[0])
                        reviewArray[i].last_name = user[0].last_name
                    }

                    reviewArray[i].avatars = user[0].avatars
                }
                // console.log(reviewArray[i])
                isGuest = false
            }
            else {
                reviewArray[i].first_name = host.first_name
                reviewArray[i].last_name = host.last_name
                reviewArray[i].avatars = host.avatars
                isGuest = true
            }

        }
    }

    return (



        <div className="container" style={{ maxWidth: "700px" }}>

            <div className="text-center py-2">
                <h1 className=""> {property.name} </h1>
                <h5 className="">{property.country}, {property.city}</h5>
            </div>

            <div className="ms-auto me-auto py-2"><Carousel pid={pid} /></div>

            <div className="d-flex justify-content-center align-items-center py-2">
                <h5 className="px-3">Hosted by {host.first_name} {host.last_name}</h5>
                <img src={host.avatars} alt="Host" className="rounded-circle img-fluid" style={{ maxHeight: '80px' }}></img>
            </div>

            <div className="py-2">
                <h5>Details</h5>
                <div>Host Email: {host.email}</div>
                <div>Host Phone Number: {host.phoneNumber}</div>
                <div>Address: {property.address}, {property.postal_code}, {property.city}, {property.country}</div>
                <div>House Information: {property.number_of_guests} Guests | {property.number_of_beds} Beds | {property.number_of_baths} Baths</div>
            </div>

            <div className="py-2">
                <h5>Description</h5>
                <div>{property.description}</div>
            </div>

            <div className="py-2">
                <h5>Amenities</h5>
                <ul>
                    {property.wifi ? (<li>Wifi</li>) : ("")}
                    {property.petfriendly ? (<li>Pet Friendly</li>) : ("")}
                    {property.tv ? (<li>TV</li>) : ("")}
                    {property.pillows ? (<li>Pillows</li>) : ("")}
                </ul>
            </div>

            <div className="py-2">
                <h5>Reviews</h5>
                {(() => {
                    if (reviews.length !== 0) {
                        return (
                            <div>

                                <div>
                                    <div>  {reviews[0].map(review =>
                                        <div>
                                            <img src={review.avatars} alt="Host" className="profile1css rounded-circle img-fluid" style={{ maxHeight: '80px' }}></img>
                                            &nbsp; {review.first_name} {review.last_name}
                                            <div>
                                                {(() => {
                                                    if (review.rating !== null)
                                                        return (
                                                            <div>
                                                                (Rating of {review.rating} stars)
                                                            </div>
                                                        )

                                                })()}



                                            </div>
                                            <ul>{review.body}</ul>
                                        </div>
                                    )}</div>
                                </div>

                            </div>
                        )
                    }
                })()}
            </div>

            <div className="py-2">
                <div className="d-flex justify-content-between" style={{ maxWidth: "700px" }}>
                    <button className="btn btn-secondary my-5" type="button" onClick={() => { if (page - 1 !== 0) setPage(page - 1) }}>Previous Review</button>
                    <button className="btn btn-secondary my-5" type="button" onClick={() => { setPage(page + 1) }}>Next Review</button>
                </div>
            </div>

        </div>
    );

    //         <div className="container">
    //             <div className="row">
    //                 <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
    //                 <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
    //                     <div className="pad-move">
    //                         <h5 className="d-flex justify-content-start pt-0 pb-2">Reviews</h5>
    //                         <div className="d-flex justify-content-start">
    //                             <div className="container">
    //                                 <div className="row">
    //                                     <div className="col-sm-2 col-3  p-0">
    //                                         <img src="userdata/Squidward.png" alt="Squidward"
    //                                             className="profile1css img-fluid rounded-circle mx-auto d-block"></img>
    //                                     </div>
    //                                     <div className="col-sm-10 col-9 p-0">
    //                                         <div className=" bold">
    //                                             Squidward Tentacles
    //                                         </div>
    //                                         <div className="">
    //                                             Rating: 1
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className="row pb-3">
    //                                     This place sucks! The host is also so annoying!
    //                                 </div>

    //                                 <div className="row">
    //                                     <div className="col-sm-2 col-3  p-0">
    //                                         <img src="userdata/Patrick.png" alt="Patrick"
    //                                             className="profile1css img-fluid rounded-circle mx-auto d-block"></img>
    //                                     </div>
    //                                     <div className="col-sm-10 col-9 p-0">
    //                                         <div className=" bold">
    //                                             Patrick Star
    //                                         </div>
    //                                         <div className="">
    //                                             Rating: 5
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className="row pb-3">
    //                                     I love this place!
    //                                 </div>

    //                             </div>
    //                         </div>
    //                         <div className="d-flex justify-content-start">
    //                             <div className="">
    //                                 <button className="btn button-darken border-0" style={{ background: '#85bded' }} data-bs-toggle="modal"
    //                                     data-bs-target="#modal">See All Reviews</button>
    //                                 <div className="modal fade" id="modal">
    //                                     <div className="modal-dialog modal-dialog-scrollable">
    //                                         <div className="modal-content">
    //                                             <div className="modal-header">
    //                                                 <h3>Reviews</h3>
    //                                                 <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
    //                                             </div>
    //                                             <div className="modal-body">
    //                                                 <h5 className="pb-3">Average Rating: 3 Stars</h5>
    //                                                 <div className="container">
    //                                                     <div className="row">
    //                                                         <div className="col-sm-2 col-3 p-0 ">
    //                                                             <img src="userdata/Squidward.png" alt="Profile 1"
    //                                                                 className="profile1css img-fluid rounded-circle"></img>
    //                                                         </div>
    //                                                         <div className="col-sm-10 col-9 p-0">
    //                                                             <div className="bold">
    //                                                                 Squidward Tentacles
    //                                                             </div>
    //                                                             <div className="text-secondary">
    //                                                                 Rating: 1 Star
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div className="row pb-3">
    //                                                         This place sucks! The host is also so annoying!
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="container">
    //                                                     <div className="row">
    //                                                         <div className="col-sm-1 col-1 p-0">
    //                                                         </div>
    //                                                         <div className="col-sm-2 col-3 p-0">
    //                                                             <img src="userdata/Spongebob.png" alt="Host 1"
    //                                                                 className="profile1css img-fluid rounded-circle"></img>
    //                                                         </div>
    //                                                         <div className="col-sm-9 col-8 p-0">
    //                                                             <div className="bold ">
    //                                                                 Spongebob Squarepants
    //                                                             </div>
    //                                                             <div className="text-secondary">
    //                                                                 (Host Reply)
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div className="row pb-4">
    //                                                         <div className="col-sm-1 col-1 p-0">
    //                                                         </div>
    //                                                         I'm sorry you feel this way.
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className="container">
    //                                                     <div className="row">
    //                                                         <div className="col-sm-2 col-3 p-0">
    //                                                             <img src="userdata/patrick.png" alt="Patrick"
    //                                                                 className="profile1css img-fluid rounded-circle"></img>
    //                                                         </div>
    //                                                         <div className="col-sm-10 col-9 p-0">
    //                                                             <div className="bold">
    //                                                                 Patrick Star
    //                                                             </div>
    //                                                             <div className="text-secondary">
    //                                                                 Rating: 5 Stars
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div className="row">
    //                                                         I love this place!
    //                                                     </div>
    //                                                     <div className="row text-secondary">
    //                                                         <a href="#" onclick="return false;"> Reply ↰</a>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                             <div className="modal-footer">
    //                                                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
    //             </div>
    //         </div>
}

export default PropertyView;
