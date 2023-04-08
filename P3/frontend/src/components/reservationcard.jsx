function Reserve() {
    return (
        <span class = "border">
            <div class="col-lg-4">
            <h5 >Reserve</h5>
            <h6 >
                $200 CAD/day | ★ 3.0
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
                        <input type="date" class="form-control" id="reserveDateInInput"
                            placeholder="Check In Date" min="2023-02-01" max="2026-12-31"></input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 ">
                        <div>Check-out Date</div>
                    </div>
                    <div class="col-6 ">
                        <input type="date" class="form-control" id="reserveDateOutInput"
                            placeholder="Check In Date" min="2023-02-01" max="2026-12-31"></input>
                    </div>
                </div>

                <div class="row pt-3">
                    <div class="col-3 ">
                        <div>$200 CAD * 3 Days</div>
                    </div>
                    <div class="col-6 ">
                        <div>$600 CAD</div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-3 ">
                        <div>Taxes</div>
                    </div>
                    <div class="col-6 ">
                        <div>$100 CAD</div>
                    </div>
                </div>


                <div class="row pb-2">
                    <div class="col-3 bold">
                        <div>Total</div>
                    </div>
                    <div class="col-6 bold">
                        <div>$700 CAD</div>
                    </div>
                </div>
            </div>
            <button class="btn button-darken border-0" style={{background: '#85bded'}}>Reserve</button>
        </div>
        </span>
        
    );
}
export default Reserve;
