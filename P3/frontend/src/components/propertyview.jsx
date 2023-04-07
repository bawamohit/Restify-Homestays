function PropertyView() {
    return (
        <div>

            <div class="container d-flex justify-content-start pt-3">
                <a class="btn button-darken" style={{ background: '#85bded' }} href="propertycreated.html" role="button">❮ Go back to host page</a>
            </div>




            <h1 class="container d-flex justify-content-center">Pineapple House</h1>
            <h6 class="container d-flex justify-content-center">Bikini Bottom, Pacific Ocean, Fiji</h6>

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
                                Address: 124 Conch Street, N1S 8G5, Bikini Bottom, Fiji
                            </div>
                            <div class="d-flex justify-content-start">
                                House Information: 5 Guests | 3 Beds | 2 Baths
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
                                This Pineapple house is the most luxurious place you will stay at. With a fruit-like exterior and modern
                                decor, I promise you will love your stay here! You also get to see Gary! But don't worry, he won't bite!
                                Although he has been getting a little grumpy lately - I wonder if I should see a vet? Also, this location
                                is close to the...
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
                                                    This Pineapple house is the most luxurious place you will stay at. With a fruit-like exterior
                                                    and modern
                                                    decor, I promise you will love your stay here! You also get to see Gary! But don't worry, he
                                                    won't bite!
                                                    Although he has been getting a little grumpy lately - I wonder if I should see a vet? Also, this
                                                    location
                                                    is close to the... Krusty Krab (where I work :3), home to the most delicious food, the Krabby
                                                    Patty! Anyways,
                                                    this is a great house. :3
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
                            <h6 class="d-flex justify-content-start text-secondary">Some Amenities Include:</h6>
                            <div class="d-flex justify-content-start">
                                <div class="container d-flex justify-content-start">
                                    <ul>
                                        <li>Wifi</li>
                                        <li>Pet Friendly</li>
                                        <li>TV</li>
                                        <li>Coffee Machine</li>
                                        <li>Heating</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="d-flex justify-content-start">
                                <div class="d-flex justify-content-start">
                                    <button class="btn button-darken border-0" style={{ background: "#85bded" }} data-bs-toggle="modal"
                                        data-bs-target="#amenities-modal">See All
                                        Amenities</button>
                                    <div class="modal fade" id="amenities-modal">
                                        <div class="modal-dialog modal-dialog-scrollable">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3>Amenities</h3>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div class="modal-body p-2">
                                                    <ul class="list-group">
                                                        <li class="list-group-item">Wifi</li>
                                                        <li class="list-group-item">Pet Friendly</li>
                                                        <li class="list-group-item">TV</li>
                                                        <li class="list-group-item">Coffee Machine</li>
                                                        <li class="list-group-item">Heating</li>
                                                        <li class="list-group-item">Towels</li>
                                                        <li class="list-group-item">Washing Machine</li>
                                                        <li class="list-group-item">Pillows</li>
                                                        <li class="list-group-item">Bed Sheets</li>
                                                    </ul>
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
            <h5 class="d-flex justify-content-start pt-3 pb-2">Reviews</h5>
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
                <button class="btn button-darken border-0" style={{background: '#85bded'}} data-bs-toggle="modal"
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
