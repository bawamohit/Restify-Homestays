import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import PropertyCard from "../components/propertycard";
import Carousel from "../components/carousel";

function PropertyView() {
    const { pid } = useParams()
    const [property, setProperty] = useState({})
    const [host, setHost] = useState({})
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch('http://localhost:8000/properties/property-view/' + pid, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
        })
            .then(response => response.json())
            .then(json => setProperty(json))
    }, [])

    useEffect(() => {
        if (Object.keys(property).length !== 0) {
            fetch('http://localhost:8000/accounts/view-user/' + property.owner, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(response => response.json())
                .then(json => setHost(json))
        }
    }, [property])

    // console.log(properties)
    // console.log(users)
    // console.log(users.first_name)

    /*
    useEffect(() => {
      fetch('http://localhost:8000/accounts/view-comment-property/3/', {
        headers: { 'Authorization': 'Bearer ' + token.access_token }
      })
        .then(response => response.json())
        .then(json => setReviews(json))
    }, [])
  
    console.log(reviews)
    */

    return (
        <div>

            <div className="container d-flex justify-content-start pt-3">
                <a className="btn button-darken" style={{ background: '#85bded' }} href="host" role="button">❮ Go back to host page</a>
            </div>

            <h1 className="container d-flex justify-content-center"> {property.name} </h1>
            <h6 className="container d-flex justify-content-center">{property.country}, {property.city}</h6>

            <div className="container pb-3 pt-1">
                <div className="px-2">Hosted by {host.first_name} {host.last_name}</div>
                <img src={host.avatars} alt="Host 1" className="profile1css img-fluid rounded-circle"></img>
            </div>

            <div className="ms-auto me-auto px-3" style={{maxWidth: "700px"}}><Carousel pid={pid}/></div>

            <div className="container">
                <div className="row">
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
                        <div className="pad-move">
                            <h5 className="d-flex justify-content-start pt-3 ">Details</h5>
                            <div className="d-flex justify-content-start">
                                Host Email: {host.email}
                            </div>
                            <div className="d-flex justify-content-start">
                                Host Phone Number: {host.phoneNumber}
                            </div>
                            <div className="d-flex justify-content-start">
                                Address: {property.address}, {property.postal_code}, {property.city}, {property.country}
                            </div>
                            <div className="d-flex justify-content-start">
                                House Information: {property.number_of_guests} Guests | {property.number_of_beds} Beds | {property.number_of_baths} Baths
                            </div>
                        </div>
                    </div>
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
                        <div className="pad-move">
                            <h5 className="d-flex justify-content-start pt-3 ">Description</h5>
                            <div className="d-flex justify-content-start">
                                {property.description}
                            </div>
                            <div className="d-flex justify-content-start">
                                <div className="d-flex justify-content-start">
                                    <a href="#" className="text-primary pt-1" data-bs-toggle="modal" data-bs-target="#desc-see-more-modal">See
                                        More</a>
                                    <div className="modal fade" id="desc-see-more-modal">
                                        <div className="modal-dialog modal-dialog-scrollable">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h3>Description</h3>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">
                                                    {property.description}
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
                        <div className="pad-move">
                            <h5 className="d-flex justify-content-start pt-3 ">Amenities</h5>
                            <div className="d-flex justify-content-start">
                                <div className="container d-flex justify-content-start">
                                    <ul>
                                        {property.wifi ? (<li>Wifi</li>) : ("")}
                                        {property.petfriendly ? (<li>Pet Friendly</li>) : ("")}
                                        {property.tv ? (<li>TV</li>) : ("")}
                                        {property.pillows ? (<li>Pillows</li>) : ("")}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
                        <div className="pad-move">
                            <h5 className="d-flex justify-content-start pt-0 pb-2">Reviews</h5>
                            <div className="d-flex justify-content-start">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-2 col-3  p-0">
                                            <img src="userdata/Squidward.png" alt="Squidward"
                                                className="profile1css img-fluid rounded-circle mx-auto d-block"></img>
                                        </div>
                                        <div className="col-sm-10 col-9 p-0">
                                            <div className=" bold">
                                                Squidward Tentacles
                                            </div>
                                            <div className="">
                                                Rating: 1
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row pb-3">
                                        This place sucks! The host is also so annoying!
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-2 col-3  p-0">
                                            <img src="userdata/Patrick.png" alt="Patrick"
                                                className="profile1css img-fluid rounded-circle mx-auto d-block"></img>
                                        </div>
                                        <div className="col-sm-10 col-9 p-0">
                                            <div className=" bold">
                                                Patrick Star
                                            </div>
                                            <div className="">
                                                Rating: 5
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row pb-3">
                                        I love this place!
                                    </div>

                                </div>
                            </div>
                            <div className="d-flex justify-content-start">
                                <div className="">
                                    <button className="btn button-darken border-0" style={{ background: '#85bded' }} data-bs-toggle="modal"
                                        data-bs-target="#modal">See All Reviews</button>
                                    <div className="modal fade" id="modal">
                                        <div className="modal-dialog modal-dialog-scrollable">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h3>Reviews</h3>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <h5 className="pb-3">Average Rating: 3 Stars</h5>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-2 col-3 p-0 ">
                                                                <img src="userdata/Squidward.png" alt="Profile 1"
                                                                    className="profile1css img-fluid rounded-circle"></img>
                                                            </div>
                                                            <div className="col-sm-10 col-9 p-0">
                                                                <div className="bold">
                                                                    Squidward Tentacles
                                                                </div>
                                                                <div className="text-secondary">
                                                                    Rating: 1 Star
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row pb-3">
                                                            This place sucks! The host is also so annoying!
                                                        </div>
                                                    </div>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-1 col-1 p-0">
                                                            </div>
                                                            <div className="col-sm-2 col-3 p-0">
                                                                <img src="userdata/Spongebob.png" alt="Host 1"
                                                                    className="profile1css img-fluid rounded-circle"></img>
                                                            </div>
                                                            <div className="col-sm-9 col-8 p-0">
                                                                <div className="bold ">
                                                                    Spongebob Squarepants
                                                                </div>
                                                                <div className="text-secondary">
                                                                    (Host Reply)
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row pb-4">
                                                            <div className="col-sm-1 col-1 p-0">
                                                            </div>
                                                            I'm sorry you feel this way.
                                                        </div>
                                                    </div>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-2 col-3 p-0">
                                                                <img src="userdata/patrick.png" alt="Patrick"
                                                                    className="profile1css img-fluid rounded-circle"></img>
                                                            </div>
                                                            <div className="col-sm-10 col-9 p-0">
                                                                <div className="bold">
                                                                    Patrick Star
                                                                </div>
                                                                <div className="text-secondary">
                                                                    Rating: 5 Stars
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            I love this place!
                                                        </div>
                                                        <div className="row text-secondary">
                                                            <a href="#" onclick="return false;"> Reply ↰</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
                </div>
            </div>

            <div className="pb-3"></div>



        </div>
    );
}

export default PropertyView;
