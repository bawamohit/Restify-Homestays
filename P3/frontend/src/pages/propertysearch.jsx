import PropertyCard from "../components/propertycard";

import { useEffect, useState } from "react";

function PropertySearch() {
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)
    
    const [sortby, setSortby] = useState("price")
    const [wifi, setWifi] = useState(false)
    const [pet, setPet] = useState(false)
    const [tv, setTv] = useState(false)
    const [pillows, setPillows] = useState(false)

    useEffect(() => {
        var queryString = `properties/property-search?page=${page}&wifi=${wifi}&petfriendly=${pet}&tv=${tv}&pillows=${pillows}&sortby=${sortby}`
        fetch(process.env.REACT_APP_BACKEND_API + queryString)
        .then(response => response.json())
        .then(json => {
            setProperties([...json.results])
            setNext(json.next)
            setPrevious(json.previous)
        })
    }, [page, wifi, pet, tv, pillows, sortby])

    function handleChange() {
        setSortby(document.getElementById("sortby").value);
    }

    return (
    <div>
        <div className="ms-auto me-auto px-3" style={{maxWidth: "700px"}}>
            <div className="d-flex gap-2 justify-content-center flex-wrap py-4 ms-auto me-auto">
                <div className="input-group">
                    <div className="form-floating">
                        <input type="search" className="form-control" id="search" placeholder="Location" aria-label="Search"
                            aria-describedby="search-addon2"/>
                        <label htmlFor="search">Location</label>
                    </div>
                    
                    <button className="btn btn-secondary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                </div>
                <div className="input-group">
                    <div className="form-floating">
                        <select onChange={handleChange} className="form-select" id="sortby" aria-label="select sortby">
                            <option value="price">Price</option>
                            <option value="guests">Guests</option>
                        </select>
                        <label htmlFor="guests">Sort By</label>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <form className="ms-auto me-auto">
                    <input type="checkbox" className="btn-check" id="wifi-filter" autoComplete="off" onChange={() => {
                        setPage(1)
                        setWifi(!wifi)
                    }}/>
                    <label className="btn btn-outline-primary" htmlFor="wifi-filter">Wifi</label>

                    <input type="checkbox" className="btn-check" id="pet-filter" autoComplete="off" onChange={() => {
                        setPage(1)
                        setPet(!pet)
                    }}/>
                    <label className="btn btn-outline-primary" htmlFor="pet-filter">Pet Friendly</label>

                    <input type="checkbox" className="btn-check" id="tv-filter" autoComplete="off" onChange={() => {
                        setPage(1)
                        setTv(!tv)
                    }}/>
                    <label className="btn btn-outline-primary" htmlFor="tv-filter">TV</label>

                    <input type="checkbox" className="btn-check" id="parking-filter" autoComplete="off" onChange={() => {
                        setPage(1)
                        setPillows(!pillows)
                    }}/>
                    <label className="btn btn-outline-primary" htmlFor="parking-filter">Pillows</label>
                </form>
            </div>
        </div>

        <div className="album my-4">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {properties.map((property) => {
                        return <PropertyCard key={property.id} name={property.name} pid={property.id} price={property.price} currency={property.currency}/>
                    })}
                </div>
            </div>
        </div>
        <div className="ms-auto me-auto" style={{maxWidth: "700px"}}>
            <div className="d-flex justify-content-between" style={{maxWidth: "700px"}}>
                <button className="btn btn-secondary my-5" type="button" onClick={()=>{if(previous) setPage(page-1)}}>Previous Page</button>
                <button className="btn btn-secondary my-5" type="button" onClick={()=>{if(next) setPage(page+1)}}>Next Page</button>
            </div>
        </div>
    </div>
    );
  }
  
  export default PropertySearch;