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
  const [images, setImages] = useState([])
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

    fetch('http://localhost:8000/properties/property-image-list/' + pid + '/', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') }
    }).then(response => response.json())
    .then(json => {setImages([...json])})
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

    if (imageArray.length < 3){
        document.getElementById("errorMsg").innerHTML = "You must choose at least 3 images!"

        return
    } 

    fetch('http://localhost:8000/properties/property-update/' + pid + '/', {
      method: 'PUT',
      headers: {
        // 'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify(propertyStuff)
    })

    // delete old images
    for (var image of images) {
        fetch('http://localhost:8000/properties/property-image-delete/' + image.id + '/', {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          }
        })
    }

    // add new images
    for (let i = 0; i < imageArray.length; i++) {
        const imageStuff = new FormData();
        imageStuff.append('image', imageArray[i]);

        fetch('http://localhost:8000/properties/property-image-create/' + pid + '/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: imageStuff
        })
    }

    navigate('/properties/host');
  }



  return (
    <div>
      <h2 className="pt-5 pb-5 text-secondary text-center">Edit Property</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="col-2">
            </div>
            <div className="col-md-8">
              <div className="form-group pb-3">
                <label htmlFor="propertyNameInput">Property Name</label>
                <input

                  type="text" required
                  className="form-control"
                  id="propertyNameInput"
                  placeholder="Enter Property"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>

              </div>
            </div>
          </div>



          <div className="row">
            <div className="col-2">
            </div>
            <div className="col-md-8">
              <div className="form-group pb-3">
                <label htmlFor="descriptionInput">Description</label>
                <textarea type="text" required
                  className="form-control"
                  id="propertyNameInput"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"></textarea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
            </div>
            <div className="col-md-8">
              <div className="form-group pb-3">
                <label htmlFor="addressInput">Address</label>
                <input type="text" required
                  className="form-control"
                  id="addressInput"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
            </div>
            <div className="col-md-8">
              <div className="form-group pb-3">
                <label htmlFor="cityInput">City</label>
                <input type="text" required
                  className="form-control"
                  id="cityInput"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
            </div>
            <div className="col-md-8">
              <div className="form-group pb-3">
                <label htmlFor="countryInput">Country</label>

                <select className="form-select text-muted"
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

          <div className="row">
            <div className="col-2">
            </div>
            <div className="col-md-8">
              <div className="form-group pb-3">
                <label htmlFor="postalCodeInput">Postal Code</label>
                <input type="text" required
                  className="form-control"
                  id="postalCodeInput"
                  placeholder="Postal Code"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-2 col-sm-2 col-md-4 col-lg-4">
            </div>
            <div className="col-8 col-sm-8 col-md-4 col-lg-4">
              <div className="row pb-3">
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center">
                  <label htmlFor="guestInput">Guests</label>

                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div>
                    <button type="button" onClick={minusOneGuest}>-</button>
                  </div>

                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> {guest} </div>
                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div>
                    <button type="button" onClick={notMinusOneGuest}>+</button>

                  </div>

                </div>
              </div>
            </div>
            <div className="col-2 col-sm-2 col-md-4 col-lg-4">
            </div>
          </div>

          <div className="row">
            <div className="col-2 col-sm-2 col-md-4 col-lg-4">
            </div>
            <div className="col-8 col-sm-8 col-md-4 col-lg-4">
              <div className="row pb-3">
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center">
                  <label htmlFor="guestInput">Beds</label>

                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> <button type="button" onClick={minusOneBed}>-</button> </div>
                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> {bed} </div>
                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> <button type="button" onClick={notMinusOneBed}>+</button> </div>
                </div>
              </div>
            </div>
            <div className="col-2 col-sm-2 col-md-4 col-lg-4">
            </div>
          </div>

          <div className="row">
            <div className="col-2 col-sm-2 col-md-4 col-lg-4">
            </div>
            <div className="col-8 col-sm-8 col-md-4 col-lg-4">
              <div className="row pb-3">
                <div className="col-3 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-center">
                  <label htmlFor="guestInput">Baths</label>

                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> <button type="button" onClick={minusOneBath}>-</button> </div>
                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> {bath} </div>
                </div>
                <div className="col-3 col-sm-3 col-lg-3 d-flex justify-content-center">
                  <div> <button type="button" onClick={notMinusOneBath}>+</button> </div>
                </div>
              </div>
            </div>
            <div className="col-2 col-sm-2 col-md-4 col-lg-4">
            </div>
          </div>

          <div className="d-flex justify-content-center">

            <ul className="list-group">
              <div className="form-check">
                <input className="form-check-input"
                  type="checkbox"
                  id="wifiAmenities"
                  checked={wifi}
                  onChange={(e) => setWifi(e.target.checked)}
                ></input>
                <label className="form-check-label" htmlFor="wifiAmenities">
                  Wifi
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="petFriendlyAmenities"
                  checked={petFriendly}
                  onChange={(e) => setPetFriendly(e.target.checked)}
                ></input>
                <label className="form-check-label" htmlFor="petFriendlyAmenities">
                  Pet Friendly
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="TVAmenities"
                  checked={TV}
                  onChange={(e) => setTV(e.target.checked)}
                ></input>
                <label className="form-check-label" htmlFor="TVAmenities">
                  TV
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="pillowsAmenities"
                  checked={pillow}
                  onChange={(e) => setPillow(e.target.checked)}
                ></input>
                <label className="form-check-label" htmlFor="pillowsAmenities">
                  Pillows
                </label>
              </div>

            </ul>
          </div>


          {/* <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col-md-8">
                            <div className="form-group pb-3">
                                <div className="row">
                                    <div className="col-12 col-sm-4 ">
                                        <label htmlFor="dateInInput">Check In Date Availablity</label>
                                    </div>
                                    <div className="col-12 col-sm-8 ">
                                        <input type="date"
                                            className="form-control"
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

                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col-md-8">
                            <div className="form-group pb-3">
                                <div className="row">
                                    <div className="col-12 col-sm-4 ">
                                        <label htmlFor="dateOutInput">Check Out Date Availablity</label>
                                    </div>
                                    <div className="col-12 col-sm-8 ">
                                        <input type="date"
                                            className="form-control"
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

          <div className="row">
            <div className="col-2">
            </div>
            <div className="col-md-8">
              <div className="form-group pb-3">
                <div className="row">
                  <div className="col-12 col-sm-4 ">
                    <label htmlFor="priceInput">Price/Currency</label>
                  </div>
                  <div className="col-7 col-sm-5 ">
                    <input type="number" required min="0.01" step="0.01"
                      className="form-control"
                      id="priceInput"
                      placeholder="Price per day"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-5 col-sm-3 ">
                    <select className="form-select text-muted" id="currencyInput"
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





          <div className="row">
            <div className="col-2 ">
            </div>
            <div className="col-md-6 ">
              <div className="form-group pb-3">
                <label htmlFor="imageInput">Images</label>
                <input type="file" multiple
                  className="form-control"
                  id="imageInput"
                  placeholder="Enter the number of guests"
                  // value={image}
                  onChange={handleImages}
                ></input>
                <small id="imageHelp" className="form-text text-muted">Must have at least 3 images.</small>
                <p id="errorMsg" className = "error"></p>
              </div>
            </div>
            <div className="col-4 ">

            </div>
          </div>

          <div className="row">
            <div className="col-2 ">
            </div>
            <div className="col-md-6 ">
              {/* <img src="PropertyData/Pineapple2.jpg" alt="House 2" className="house1createproperty img-darken"></img>
                            <img src="PropertyData/Pineapple3.jpg" alt="House 3" className="house1createproperty img-darken"></img> */}
            </div>
          </div>

          <div className="container pb-3">
            <NavLink to={"/properties/host/"} className="btn btn-secondary">Previous Page</NavLink>
            <button className="btn float-end button-darken" style={{ background: "#85bded" }} type="submit">Edit Property!</button>


          </div>






        </form>
      </div >
    </div>
  );
}

export default PropertyEdit;

