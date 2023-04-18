import { useEffect, useState } from "react";
var token = localStorage.getItem('accessToken')
function Reserve(props) {
    const property_id = props.property_id;
    const price = props.price;
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalDays, setTotalDays] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [tax, setTaxes] = useState(null);
    const [sumPrice, setSumPrice] = useState(null);
    const [guest, setGuest] = useState(1);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const diffInMs = end.getTime() - start.getTime();
            const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
            setTotalDays(diffInDays);
            setTotalPrice(diffInDays * price);
            setTaxes(diffInDays * price * 0.05);
            setSumPrice(diffInDays * price * 0.05 + diffInDays * price);
        }
    }, [startDate, endDate]);

    return (
        <div>
            <div className="col-lg-6">
                <h5 >Reserve</h5>
                <h6 >
                    ${price}CAD/day
                </h6>


                <div className="">
                    <div className="row">
                        <div className="col-lg-6 col-3">
                            <div>
                                <label htmlFor="guestSelect">Guests</label>
                            </div>
                        </div>
                        <div className="col-lg-6 col-3">
                            <div>
                                <select className="form-select" id="guestSelect"  onChange={(event) => setGuest(event.target.value)}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4+</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-3">
                            <div>Check-in Date</div>
                        </div>
                        <div className="col-lg-6 col-3">
                            <input type="date" className="form-control" id="startDate" min="2023-02-01" max="2026-12-31"
                                value={startDate} onChange={(event) => setStartDate(event.target.value)} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-3">
                            <div>Check-out Date</div>
                        </div>
                        <div className="col-lg-6 col-3">
                            <input type="date" className="form-control" id="endDate" min="2023-02-01" max="2026-12-31"
                                value={endDate} onChange={(event) => setEndDate(event.target.value)} />
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-lg-6 col-3">
                            <div>${price} CAD * {totalDays} Days</div>
                        </div>
                        <div className="col-lg-6 col-3">
                            <div>${totalPrice} CAD</div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-lg-6 col-3">
                            <div>Taxes</div>
                        </div>
                        <div className="col-lg-6 col-3">
                            <div>${tax} CAD</div>
                        </div>
                    </div>


                    <div className="row pb-2">
                        <div className="col-lg-6 col-3 bold">
                            <div>Total</div>
                        </div>
                        <div className="col-lg-6 col-3 bold">
                            <div>${sumPrice} CAD</div>
                        </div>
                    </div>
                </div>
                <button className="btn button-darken border-0" style={{ background: '#85bded' }} onClick={() =>
                    fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-create/', {
                        method: 'POST',
                        headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            property: property_id,
                            res_start_time: startDate,
                            res_end_time: endDate,
                            price: price,
                            guests: guest
                        })
                    })
                        .then(response => {
                            // handle response
                        })
                        .catch(error => {
                            // handle error
                        })}>Reserve</button>
            </div>
        </div>

    );
}
export default Reserve;
