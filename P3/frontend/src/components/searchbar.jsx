function SearchBar() {
    return (<div>
        <div class="d-flex gap-2 justify-content-center flex-wrap py-4 ms-auto me-auto">
            <div class="input-group">
                <div class="form-floating">
                    <input type="date" class="form-control" id="checkIn"/>
                    <label for="checkIn">Check-in</label>
                </div>
                <div class="form-floating">
                    <input type="date" class="form-control" id="checkOut"/>
                    <label for="checkOut">Check-out</label>
                </div>
                <div class="form-floating">
                    <select class="form-select" id="guests" aria-label="select guests">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                    </select>
                    <label for="guests">Guests</label>
                </div>
            </div>
            <div class="input-group">
                <div class="form-floating">
                    <input type="search" class="form-control" id="search" placeholder="Location" aria-label="Search"
                        aria-describedby="search-addon2"/>
                    <label for="search">Location</label>
                </div>
                <button class="btn btn-secondary" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
            </div>
        </div>

        <div class="text-center">
            <form class="ms-auto me-auto">
                <input type="checkbox" class="btn-check" id="wifi-filter" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="wifi-filter">Wifi</label>

                <input type="checkbox" class="btn-check" id="pet-filter" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="pet-filter">Pet Friendly</label>

                <input type="checkbox" class="btn-check" id="tv-filter" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="tv-filter">TV</label>

                <input type="checkbox" class="btn-check" id="parking-filter" autocomplete="off"/>
                    <label class="btn btn-outline-primary" for="parking-filter">Pillows</label>
            </form>
        </div>
    </div>
    );
  }
  
  export default SearchBar;