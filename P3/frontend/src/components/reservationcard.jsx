import { useEffect, useState } from "react";

function Reserve(property_id, price, rating) {
    const [property, setProperty] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalDays, setTotalDays] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [tax, setTaxes] = useState(null);
    const [sumPrice, setSumPrice] = useState(null);


    useEffect(() => {
        if (startDate && endDate && price) {
          const start = new Date(startDate);
          const end = new Date(endDate);
    
          const diffInMs = end.getTime() - start.getTime();
          const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
          setTotalDays(diffInDays);
          setTotalPrice(diffInDays * price);
          setTaxes(diffInDays * 0.05);
          setSumPrice(tax + totalPrice);
        }
    }, [startDate, endDate, price]);

    
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_API + 'properties/property/view/#{property_id}')
        .then(response => {
            console.log(response);
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 404) {
              throw new Error('Requested resource not found');
            } else {
              throw new Error('Server error');
            }
          })
        .then(json => {
            console.log("yay");
            setProperty(json.data);
        }).catch(error => {
            console.log("no");
            console.log(error);
        })
    }, [property])

    return (
        <span class = "border">
            <div class="col-lg-4">
            <h5 >Reserve</h5>
            <h6 >
                ${price}CAD/day | ★ {rating}
            </h6>


            <div class="">
                <div class="row">
                    <div class="col-3">
                        <div>
                            <label for="guestSelect">Guests</label>
                        </div>
                    </div>
                    <div class="col-6 ">
                        <div>
                            <select class="form-select" id="guestSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4+</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 ">
                        <div>Check-in Date</div>
                    </div> 
                    <div class="col-6 ">
                        <input type="date" class="form-control" id="startDate" min="2023-02-01" max="2026-12-31" 
                        value={startDate} onChange={(event) => setStartDate(event.target.value)} />
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 ">
                        <div>Check-out Date</div>
                    </div>
                    <div class="col-6 ">
                        <input type="date" class="form-control" id="endDate" min="2023-02-01" max="2026-12-31" 
                        value={endDate} onChange={(event) => setEndDate(event.target.value)} />
                    </div>
                </div>

                <div class="row pt-3">
                    <div class="col-3 ">
                        <div>${price} CAD * {totalDays} Days</div>
                    </div>
                    <div class="col-6 ">
                        <div>${totalPrice} CAD</div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-3 ">
                        <div>Taxes</div>
                    </div>
                    <div class="col-6 ">
                        <div>${tax} CAD</div>
                    </div>
                </div>


                <div class="row pb-2">
                    <div class="col-3 bold">
                        <div>Total</div>
                    </div>
                    <div class="col-6 bold">
                        <div>${sumPrice} CAD</div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn-btn button-darken border-0" aria-label="Close" style={{background: '#85bded'}} onClick={() => 
                    fetch(process.env.REACT_APP_BACKEND_API +  'properties/reservation-create/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            property: {property_id},
                            res_start_time: {startDate},
                            res_end_time: {endDate}, 
                            price: {price}
                        })
                        })
                        .then(response => {
                        // handle response
                        })
                        .catch(error => {
                        // handle error
                        })}></button>
            <button class="btn button-darken border-0" style={{background: '#85bded'}}>Reserve</button>
        </div>
        </span>
        
    );
}
export default Reserve;
