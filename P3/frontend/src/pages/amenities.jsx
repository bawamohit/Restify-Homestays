function App() {
    return (
        <div>
            <h2 class="pt-5 text-secondary text-center">Amenities</h2>
            <h5 class="py-2 d-flex justify-content-center text-secondary">Select The Amenities That You Offer:</h5>

            <div class="d-flex justify-content-center">

                <ul class="list-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="wifiAmenities"></input>
                        <label class="form-check-label" for="wifiAmenities">
                            Wifi
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="airConditioningAmenities"></input>
                        <label class="form-check-label" for="airConditioningAmenities">
                            Air Conditioning
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="petFriendlyAmenities"></input>
                        <label class="form-check-label" for="petFriendlyAmenities">
                            Pet Friendly
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="TVAmenities"></input>
                        <label class="form-check-label" for="TVAmenities">
                            TV
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="coffeeAmenities"></input>
                        <label class="form-check-label" for="coffeeAmenities">
                            Coffee Machine
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="dishWasherAmenities"></input>
                        <label class="form-check-label" for="dishWasherAmenities">
                            Dishwasher
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="heatingAmenities"></input>
                        <label class="form-check-label" for="heatingAmenities">
                            Heating
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="potsPansAmenities"></input>
                        <label class="form-check-label" for="potsPansAmenities">
                            Pots/Pans
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="bluetoothSpeakerAmenities"></input>
                        <label class="form-check-label" for="bluetoothSpeakerAmenities">
                            Bluetooth Speaker
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="towelsAmenities"></input>
                        <label class="form-check-label" for="towelsAmenities">
                            Towels
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="toothbrush/toothpasteAmenities"></input>
                        <label class="form-check-label" for="toothbrush/toothpasteAmenities">
                            Toothbrush/Toothpaste
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="washingMachineAmenities"></input>
                        <label class="form-check-label" for="washingMachineAmenities">
                            Washing Machine
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="dryerAmenities"></input>
                        <label class="form-check-label" for="dryerAmenities">
                            Dryer
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="pillowsAmenities"></input>
                        <label class="form-check-label" for="pillowsAmenities">
                            Pillows
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="bedSheetsAmenities"></input>
                        <label class="form-check-label" for="bedSheetsAmenities">
                            Bed Sheets
                        </label>
                    </div>
                </ul>
            </div>

            <div class="container">
                <a class="btn btn-secondary" href="create" role="button">Previous Page</a>
                <a class="btn float-end button-darken" style={{ background: '#85bded' }} href="hostproperties" role="button">Create Property!</a>
            </div>

        </div>
    );
}

export default App;
