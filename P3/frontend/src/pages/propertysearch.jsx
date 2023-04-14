import SearchBar from "../components/searchbar";
import PropertyCard from "../components/propertycard";

import { useEffect, useState } from "react";

function PropertySearch() {
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_API + 'properties/property-search')
        .then(response => response.json())
        .then(json => setProperties([...properties, ...json.results]))
    }, [])

    return (
    <div>
        <div className="ms-auto me-auto"><SearchBar/></div>
        <div className="album my-4">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {properties.map(property => <PropertyCard key={property.id} name={property.name} image={property.images}/>)}
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default PropertySearch;