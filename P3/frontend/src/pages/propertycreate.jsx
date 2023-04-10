function PropertyCreate() {
    return (
        <div>
            <h2 class="pt-5 pb-5 text-secondary text-center">Create a New Property</h2>
            <div class="container">
                <form>

                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <label for="propertyNameInput">Property Name</label>
                                <input type="text" class="form-control" id="propertyNameInput" placeholder="Enter Property"></input>
                            </div>
                        </div>
                    </div>




                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <label for="descriptionInput">Description</label>
                                <textarea type="text" class="form-control" id="propertyNameInput" placeholder="Enter Description"
                                    rows="3"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <label for="addressInput">Address</label>
                                <input type="text" class="form-control" id="addressInput" placeholder="Address"></input>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <label for="cityInput">City</label>
                                <input type="text" class="form-control" id="cityInput" placeholder="City"></input>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <label for="countryInput">Country</label>

                                <select class="form-select text-muted">
                                    <option>Canada</option>
                                    <option>United States</option>
                                    <option>Fiji</option>
                                    <option>Mexico</option>
                                    <option>France</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <label for="postalCodeInput">Postal Code</label>
                                <input type="text" class="form-control" id="postalCodeInput" placeholder="Postal Code"></input>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-4 col-lg-4">
                        </div>
                        <div class="col-8 col-sm-8 col-md-4 col-lg-4">
                            <div class="row pb-3">
                                <div class="col-3 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center">
                                    <label for="guestInput">Guests</label>

                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div class="rounded-circle circleIcon"> - </div>
                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div> 2 </div>
                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div class="rounded-circle circleIcon "> + </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 col-sm-2 col-md-4 col-lg-4">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-4 col-lg-4">
                        </div>
                        <div class="col-8 col-sm-8 col-md-4 col-lg-4">
                            <div class="row pb-3">
                                <div class="col-3 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center">
                                    <label for="guestInput">Beds</label>

                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div class="rounded-circle circleIcon"> - </div>
                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div> 2 </div>
                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div class="rounded-circle circleIcon "> + </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 col-sm-2 col-md-4 col-lg-4">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-4 col-lg-4">
                        </div>
                        <div class="col-8 col-sm-8 col-md-4 col-lg-4">
                            <div class="row pb-3">
                                <div class="col-3 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center">
                                    <label for="guestInput">Baths</label>

                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div class="rounded-circle circleIcon"> - </div>
                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div> 2 </div>
                                </div>
                                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                                    <div class="rounded-circle circleIcon "> + </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 col-sm-2 col-md-4 col-lg-4">
                        </div>
                    </div>



                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <div class="row">
                                    <div class="col-12 col-sm-4 ">
                                        <label for="dateInInput">Check In Date Availablity</label>
                                    </div>
                                    <div class="col-12 col-sm-8 ">
                                        <input type="date" class="form-control" id="dateInInput" placeholder="Check In Date" min="2023-02-01"
                                            max="2026-12-31"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <div class="row">
                                    <div class="col-12 col-sm-4 ">
                                        <label for="dateOutInput">Check Out Date Availablity</label>
                                    </div>
                                    <div class="col-12 col-sm-8 ">
                                        <input type="date" class="form-control" id="dateOutInput" placeholder="Check Out Date"
                                            min="2023-02-01" max="2026-12-31"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <div class="row">
                                    <div class="col-12 col-sm-4 ">
                                        <label for="priceInput">Price/Currency</label>
                                    </div>
                                    <div class="col-7 col-sm-5 ">
                                        <input type="text" class="form-control" id="priceInput" placeholder="Price per day"></input>
                                    </div>
                                    <div class="col-5 col-sm-3 ">
                                        <select class="form-select text-muted" id="currencyInput">
                                            <option>CAD</option>
                                            <option>USD</option>
                                            <option>FJD</option>
                                            <option>MXN</option>
                                            <option>EUR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row pb-3">
                        <div class="col-2 ">
                        </div>
                        <div class="col-md-8 ">
                            <button class="btn btn-light border border-1 float-end">Add Date & Price</button>
                        </div>
                    </div>

                    <div class="row pb-3">
                        <div class="col-2 ">
                        </div>
                        <div class="col-md-8 ">

                            <u>
                                Selected Availablity Dates and Price
                            </u>
                            <div>
                                <strong>x</strong> 13/02/2023 - 15/02/2023 | $200 CAD
                            </div>
                            <div>
                                <strong>x</strong> 17/03/2023 - 19/02/2023 | $300 CAD
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2 ">
                        </div>
                        <div class="col-md-6 ">
                            <div class="form-group pb-3">
                                <label for="imageInput">Images</label>
                                <input type="file" class="form-control" id="imageInput" placeholder="Enter the number of guests"></input>
                            </div>
                        </div>
                        <div class="col-4 ">

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2 ">
                        </div>
                        <div class="col-md-6 ">
                            <img src="PropertyData/Pineapple2.jpg" alt="House 2" class="house1createproperty img-darken"></img>
                            <img src="PropertyData/Pineapple3.jpg" alt="House 3" class="house1createproperty img-darken"></img>
                        </div>
                    </div>

                    <div class="container pb-3">
                        <a class="btn btn-secondary" href="hostproperties" role="button">Previous Page</a>
                        <a class="btn float-end button-darken" style={{background: "#85bded"}} href="amenities" role="button">Next Page</a>
                    </div>

                </form>
            </div >
        </div>
    );
}

export default PropertyCreate;

