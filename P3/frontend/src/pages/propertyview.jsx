import { useEffect, useState } from "react";
import PropertyCard from "../components/propertycard";

const token = {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNjA1NTczLCJpYXQiOjE2ODE1MTkxNzMsImp0aSI6Ijc1MDAxZWMwZDBiZTQ4OTZhOTFiYTgzOTQ3NmI4N2VjIiwidXNlcl9pZCI6MX0.xzy0PPemNOCP4czCxLO7yDkiyaW0UZoHf8riVDu_KgI",
  "token_type": "Bearer",
  "expires_in": 3600000
};

function PropertyView() {


  const [properties, setProperties] = useState([])
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('http://localhost:8000/properties/property-view/3/', {
      headers: { 'Authorization': 'Bearer ' + token.access_token }
    })
      .then(response => response.json())
      .then(json => setProperties(json))
  }, [])

  /*
  useEffect(() => {
    fetch('http://localhost:8000/accounts/list-user/?page=' + properties.owner, {
      headers: { 'Authorization': 'Bearer ' + token.access_token }
    })
      .then(response => response.json())
      .then(json => setUsers(json))
  }, [])
  */

  // console.log(users)
  // console.log(users.first_name)


  useEffect(() => {
    fetch('http://localhost:8000/accounts/view-comment-property/3/', {
      headers: { 'Authorization': 'Bearer ' + token.access_token }
    })
      .then(response => response.json())
      .then(json => setReviews(json))
  }, [])

  console.log(reviews)

  return (
    <div>

      <div class="container d-flex justify-content-start pt-3">
        <a class="btn button-darken" style={{ background: '#85bded' }} href="hostproperties" role="button">❮ Go back to host page</a>
      </div>

      <h1 class="container d-flex justify-content-center"> {properties.name} </h1>
      <h6 class="container d-flex justify-content-center">{properties.country}, {properties.city}</h6>


      <div class="container d-flex justify-content-center pb-3 pt-1">
        <img src="userdata/Spongebob.png" alt="Host 1" class="profile1css img-fluid rounded-circle"></img>
        <div class="px-2 d-flex align-self-center">Hosted by Spongebob Squarepants</div>
      </div>


      <div id="pineapple-placeholder" class="img-max-width me-auto ms-auto"></div>
      {/*<script>$(function () { $("#pineapple-placeholder").load("./Components/pineapple.html"); });</script>*/}


      <div class="container">
        <div class="row">
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
          <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
            <div class="pad-move">
              <h5 class="d-flex justify-content-start pt-3 ">Details</h5>
              <div class="d-flex justify-content-start">
                Host Email: spongebob@gmail.com
              </div>
              <div class="d-flex justify-content-start">
                Host Phone Number: 647-111-2222
              </div>
              <div class="d-flex justify-content-start">
                Address: {properties.address}, {properties.postal_code}, {properties.city}, {properties.country}
              </div>
              <div class="d-flex justify-content-start">
                House Information: {properties.number_of_guests} Guests | {properties.number_of_beds} Beds | {properties.number_of_baths} Baths
              </div>
            </div>
          </div>
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
          <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
            <div class="pad-move">
              <h5 class="d-flex justify-content-start pt-3 ">Description</h5>
              <div class="d-flex justify-content-start">
                {properties.description}
              </div>
              <div class="d-flex justify-content-start">
                <div class="d-flex justify-content-start">
                  <a href="#" class="text-primary pt-1" data-bs-toggle="modal" data-bs-target="#desc-see-more-modal">See
                    More</a>
                  <div class="modal fade" id="desc-see-more-modal">
                    <div class="modal-dialog modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h3>Description</h3>
                          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                          {properties.description}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
          <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
            <div class="pad-move">
              <h5 class="d-flex justify-content-start pt-3 ">Amenities</h5>
              <div class="d-flex justify-content-start">
                <div class="container d-flex justify-content-start">
                  <ul>
                    {properties.wifi ? (<li>Wifi</li>): ("")}
                    {properties.petfriendly ? (<li>Pet Friendly</li>): ("")}
                    {properties.tv ? (<li>TV</li>): ("")}
                    {properties.pillows ? (<li>Pillows</li>): ("")}
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
          <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8 col-xxl-8 ">
            <div class="pad-move">
              <h5 class="d-flex justify-content-start pt-0 pb-2">Reviews</h5>
              <div class="d-flex justify-content-start">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-2 col-3  p-0">
                      <img src="userdata/Squidward.png" alt="Squidward"
                        class="profile1css img-fluid rounded-circle mx-auto d-block"></img>
                    </div>
                    <div class="col-sm-10 col-9 p-0">
                      <div class=" bold">
                        Squidward Tentacles
                      </div>
                      <div class="">
                        Rating: 1
                      </div>
                    </div>
                  </div>
                  <div class="row pb-3">
                    This place sucks! The host is also so annoying!
                  </div>

                  <div class="row">
                    <div class="col-sm-2 col-3  p-0">
                      <img src="userdata/Patrick.png" alt="Patrick"
                        class="profile1css img-fluid rounded-circle mx-auto d-block"></img>
                    </div>
                    <div class="col-sm-10 col-9 p-0">
                      <div class=" bold">
                        Patrick Star
                      </div>
                      <div class="">
                        Rating: 5
                      </div>
                    </div>
                  </div>
                  <div class="row pb-3">
                    I love this place!
                  </div>

                </div>
              </div>
              <div class="d-flex justify-content-start">
                <div class="">
                  <button class="btn button-darken border-0" style={{ background: '#85bded' }} data-bs-toggle="modal"
                    data-bs-target="#modal">See All Reviews</button>
                  <div class="modal fade" id="modal">
                    <div class="modal-dialog modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h3>Reviews</h3>
                          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                          <h5 class="pb-3">Average Rating: 3 Stars</h5>
                          <div class="container">
                            <div class="row">
                              <div class="col-sm-2 col-3 p-0 ">
                                <img src="userdata/Squidward.png" alt="Profile 1"
                                  class="profile1css img-fluid rounded-circle"></img>
                              </div>
                              <div class="col-sm-10 col-9 p-0">
                                <div class="bold">
                                  Squidward Tentacles
                                </div>
                                <div class="text-secondary">
                                  Rating: 1 Star
                                </div>
                              </div>
                            </div>
                            <div class="row pb-3">
                              This place sucks! The host is also so annoying!
                            </div>
                          </div>
                          <div class="container">
                            <div class="row">
                              <div class="col-sm-1 col-1 p-0">
                              </div>
                              <div class="col-sm-2 col-3 p-0">
                                <img src="userdata/Spongebob.png" alt="Host 1"
                                  class="profile1css img-fluid rounded-circle"></img>
                              </div>
                              <div class="col-sm-9 col-8 p-0">
                                <div class="bold ">
                                  Spongebob Squarepants
                                </div>
                                <div class="text-secondary">
                                  (Host Reply)
                                </div>
                              </div>
                            </div>
                            <div class="row pb-4">
                              <div class="col-sm-1 col-1 p-0">
                              </div>
                              I'm sorry you feel this way.
                            </div>
                          </div>
                          <div class="container">
                            <div class="row">
                              <div class="col-sm-2 col-3 p-0">
                                <img src="userdata/patrick.png" alt="Patrick"
                                  class="profile1css img-fluid rounded-circle"></img>
                              </div>
                              <div class="col-sm-10 col-9 p-0">
                                <div class="bold">
                                  Patrick Star
                                </div>
                                <div class="text-secondary">
                                  Rating: 5 Stars
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              I love this place!
                            </div>
                            <div class="row text-secondary">
                              <a href="#" onclick="return false;"> Reply ↰</a>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-2 col-xxl-2 "></div>
        </div>
      </div>

      <div class="pb-3"></div>



    </div>
  );
}

export default PropertyView;
