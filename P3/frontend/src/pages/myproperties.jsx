import { useEffect, useState } from "react";
import PropertyCard from "../components/propertycard";

function MyProperties() {
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(1)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)

    useEffect(() => {
        var token = localStorage.getItem('accessToken')
        if (token) {
            fetch(process.env.REACT_APP_BACKEND_API + 'properties/property-owned/', {
                headers: { 'Authorization': 'Bearer ' + token }
            }).then(response => response.json())
                .then(json => {
                    setProperties([...json.results])
                    setNext(json.next)
                    setPrevious(json.previous)
                })
        }
    }, [])

    return (
        <div>
            <div class="container">
                <h2 class="pt-5 pb-5 text-secondary text-center">My Properties</h2>
                <div class="d-flex justify-content-center my-4">
                    <a class="btn btn-light border border-1" href="create" role="button">Create New Property</a>
                    <a class="btn btn-light border border-1" href="edit" role="button">Edit a Property</a>
                    <a class="btn btn-light border border-1" href="hostview" role="button">(temp) view a property</a>
                </div>
                <div className="album my-4">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {properties.map((property) => {
                                return <PropertyCard key={property.id} name={property.name} pid={property.id} price={property.price} currency={property.currency} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="ms-auto me-auto" style={{ maxWidth: "700px" }}>
                <div className="d-flex justify-content-between" style={{ maxWidth: "700px" }}>
                    <button className="btn btn-secondary my-5" type="button" onClick={() => { if (previous) setPage(page - 1) }}>Previous Page</button>
                    <button className="btn btn-secondary my-5" type="button" onClick={() => { if (next) setPage(page + 1) }}>Next Page</button>
                </div>
            </div>
        </div>
    );
}

export default MyProperties;