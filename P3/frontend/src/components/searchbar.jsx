function SearchBar() {
    return (<div>
        <div className="d-flex gap-2 justify-content-center flex-wrap py-4 ms-auto me-auto">
            <div className="input-group">
                <div className="form-floating">
                    <input type="date" className="form-control" id="checkIn"/>
                    <label htmlFor="checkIn">Check-in</label>
                </div>
                <div className="form-floating">
                    <input type="date" className="form-control" id="checkOut"/>
                    <label htmlFor="checkOut">Check-out</label>
                </div>
                <div className="form-floating">
                    <select className="form-select" id="guests" aria-label="select guests">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                    </select>
                    <label htmlFor="guests">Guests</label>
                </div>
            </div>
            <div className="input-group">
                <div className="form-floating">
                    <input type="search" className="form-control" id="search" placeholder="Location" aria-label="Search"
                        aria-describedby="search-addon2"/>
                    <label htmlFor="search">Location</label>
                </div>
                <button className="btn btn-secondary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
            </div>
        </div>

        <div className="text-center">
            <form className="ms-auto me-auto">
                <input type="checkbox" className="btn-check" id="wifi-filter" autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="wifi-filter">Wifi</label>

                <input type="checkbox" className="btn-check" id="pet-filter" autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="pet-filter">Pet Friendly</label>

                <input type="checkbox" className="btn-check" id="tv-filter" autoComplete="off"/>
                <label className="btn btn-outline-primary" htmlFor="tv-filter">TV</label>

                <input type="checkbox" className="btn-check" id="parking-filter" autoComplete="off"/>
                    <label className="btn btn-outline-primary" htmlFor="parking-filter">Pillows</label>
            </form>
        </div>
    </div>
    );
  }
  
  export default SearchBar;