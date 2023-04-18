import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom";

function PropertyEdit() {

  const navigate = useNavigate();

  const { pid } = useParams()
  const [name, setName] = useState()
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('Canada')
  const [postal, setPostal] = useState('')
  const [guest, setGuest] = useState(1)
  const [bed, setBed] = useState(0)
  const [bath, setBath] = useState(0)
  const [wifi, setWifi] = useState(false)
  const [petFriendly, setPetFriendly] = useState(false)
  const [TV, setTV] = useState(false)
  const [pillow, setPillow] = useState(false)
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('CAD')
  const [image, setImage] = useState([])
  const [loggedIn, setLoggedIn] = useState([])
  // const [info, setInfo] = useState([])


  let imageArray = []



  useEffect(() => {
    fetch('http://localhost:8000/accounts/see-logged-in-user', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
    })
      .then(response => response.json())
      .then(json => {
        setLoggedIn(json)
      })
  }, [])


  useEffect(() => {
    fetch('http://localhost:8000/properties/property-update/' + pid + '/', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
    }).then(response => response.json())
      .then(json => {
        // setInfo(json)
        setName(json.name)
        setDescription(json.description)
        setAddress(json.address)
        setCity(json.city)
        setCountry(json.country)
        setPostal(json.postal_code)
        setGuest(json.number_of_guests)
        setBed(json.number_of_beds)
        setBath(json.number_of_baths)
        setWifi(json.wifi)
        setPetFriendly(json.petfriendly)
        setTV(json.tv)
        setPillow(json.pillows)
        setPrice(json.price)
        setCurrency(json.currency)
      })
  }, [pid])

  // console.log(info)

  /*  if (loggedIn.length !== 0) {
       console.log(loggedIn)
   } */


  function notMinusOneGuest() {
    setGuest(guest + 1)
  }

  function minusOneGuest() {
    if (guest - 1 < 1) return;
    setGuest(guest - 1)
  }


  function notMinusOneBed() {
    setBed(bed + 1)
  }

  function minusOneBed() {
    if (bed - 1 < 0) return;
    setBed(bed - 1)
  }


  function notMinusOneBath() {
    setBath(bath + 1)
  }

  function minusOneBath() {
    if (bath - 1 < 0) return;
    setBath(bath - 1)
  }


  const handleImages = (e) => {
    if (e.target.files) {
      imageArray.push(...e.target.files)
      console.log(imageArray)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const propertyStuff = {
      owner: loggedIn,
      name,
      address,
      city,
      country,
      postal_code: postal,
      description,
      number_of_guests: guest,
      number_of_beds: bed,
      number_of_baths: bath,
      wifi,
      petfriendly: petFriendly,
      tv: TV,
      pillows: pillow,
      price,
      currency,
    }

    // console.log(propertyStuff)

    let propertyID = 0
    fetch('http://localhost:8000/properties/property-update/' + pid + '/', {
      method: 'PUT',
      headers: {
        // 'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify(propertyStuff)
    })
      .then(response => response.json())
      .then(json => {
        propertyID = json.id
        fetch('http://localhost:8000/properties/property-image-delete/' + propertyID + '/', {
          method: 'DELETE',
          headers: {
            // "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          },
          // body: JSON.stringify(imageStuff)
          // body: imageStuff
        })
      })

      .then(json => {
        propertyID = json.id
        for (let i = 0; i < imageArray.length; i++) {
          const imageStuff = new FormData();
          imageStuff.append('image', imageArray[i]);

          fetch('http://localhost:8000/properties/property-image-create/' + propertyID + '/', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: imageStuff
            
          })
            .then(response => response.json())
        }
      })



    navigate('/properties/host');
  }



  return (


    <div>

      <h2 class="pt-5 pb-5 text-secondary text-center">Edit Property</h2>
      <div class="container">
        <form onSubmit={handleSubmit}>

          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-md-8">
              <div class="form-group pb-3">
                <label for="propertyNameInput">Property Name</label>
                <input

                  type="text" required
                  class="form-control"
                  id="propertyNameInput"
                  placeholder="Enter Property"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>

              </div>
            </div>
          </div>



          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-md-8">
              <div class="form-group pb-3">
                <label for="descriptionInput">Description</label>
                <textarea type="text" required
                  class="form-control"
                  id="propertyNameInput"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <input type="text" required
                  class="form-control"
                  id="addressInput"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-md-8">
              <div class="form-group pb-3">
                <label for="cityInput">City</label>
                <input type="text" required
                  class="form-control"
                  id="cityInput"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-md-8">
              <div class="form-group pb-3">
                <label for="countryInput">Country</label>

                <select class="form-select text-muted"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
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
                <input type="text" required
                  class="form-control"
                  id="postalCodeInput"
                  placeholder="Postal Code"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                ></input>
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
                  <div>
                    <button type="button" onClick={minusOneGuest}>-</button>
                  </div>

                </div>
                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> {guest} </div>
                </div>
                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div>
                    <button type="button" onClick={notMinusOneGuest}>+</button>

                  </div>

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
                  <div> <button type="button" onClick={minusOneBed}>-</button> </div>
                </div>
                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> {bed} </div>
                </div>
                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> <button type="button" onClick={notMinusOneBed}>+</button> </div>
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
                  <div> <button type="button" onClick={minusOneBath}>-</button> </div>
                </div>
                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> {bath} </div>
                </div>
                <div class="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> <button type="button" onClick={notMinusOneBath}>+</button> </div>
                </div>
              </div>
            </div>
            <div class="col-2 col-sm-2 col-md-4 col-lg-4">
            </div>
          </div>

          <div class="d-flex justify-content-center">

            <ul class="list-group">
              <div class="form-check">
                <input class="form-check-input"
                  type="checkbox"
                  id="wifiAmenities"
                  checked={wifi}
                  onChange={(e) => setWifi(e.target.checked)}
                ></input>
                <label class="form-check-label" for="wifiAmenities">
                  Wifi
                </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="petFriendlyAmenities"
                  checked={petFriendly}
                  onChange={(e) => setPetFriendly(e.target.checked)}
                ></input>
                <label class="form-check-label" for="petFriendlyAmenities">
                  Pet Friendly
                </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="TVAmenities"
                  checked={TV}
                  onChange={(e) => setTV(e.target.checked)}
                ></input>
                <label class="form-check-label" for="TVAmenities">
                  TV
                </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="pillowsAmenities"
                  checked={pillow}
                  onChange={(e) => setPillow(e.target.checked)}
                ></input>
                <label class="form-check-label" for="pillowsAmenities">
                  Pillows
                </label>
              </div>

            </ul>
          </div>


          {/* <div class="row">
                        <div class="col-2">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group pb-3">
                                <div class="row">
                                    <div class="col-12 col-sm-4 ">
                                        <label for="dateInInput">Check In Date Availablity</label>
                                    </div>
                                    <div class="col-12 col-sm-8 ">
                                        <input type="date"
                                            class="form-control"
                                            id="dateInInput"
                                            placeholder="Check In Date"
                                            min="2023-02-01"
                                            max="2026-12-31"
                                            value={checkInDate}
                                            onChange={(e) => setCheckInDate(e.target.value)}
                                        ></input>
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
                                        <input type="date"
                                            class="form-control"
                                            id="dateOutInput"
                                            placeholder="Check Out Date"
                                            min="2023-02-01"
                                            max="2026-12-31"
                                            value={checkOutDate}
                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

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
                    <input type="number" required min="0.01" step="0.01"
                      class="form-control"
                      id="priceInput"
                      placeholder="Price per day"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>
                  <div class="col-5 col-sm-3 ">
                    <select class="form-select text-muted" id="currencyInput"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
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





          <div class="row">
            <div class="col-2 ">
            </div>
            <div class="col-md-6 ">
              <div class="form-group pb-3">
                <label for="imageInput">Images</label>
                <input type="file" multiple
                  class="form-control"
                  id="imageInput"
                  placeholder="Enter the number of guests"
                  // value={image}
                  onChange={handleImages}
                ></input>
              </div>
            </div>
            <div class="col-4 ">

            </div>
          </div>

          <div class="row">
            <div class="col-2 ">
            </div>
            <div class="col-md-6 ">
              {/* <img src="PropertyData/Pineapple2.jpg" alt="House 2" class="house1createproperty img-darken"></img>
                            <img src="PropertyData/Pineapple3.jpg" alt="House 3" class="house1createproperty img-darken"></img> */}
            </div>
          </div>

          <div class="container pb-3">
            <NavLink to={"/properties/host/"} className="btn btn-secondary">Previous Page</NavLink>
            <button class="btn float-end button-darken" style={{ background: "#85bded" }} type="submit">Edit Property!</button>


          </div>






        </form>
      </div >
    </div>
  );
}

export default PropertyEdit;

