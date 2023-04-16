import Carousel from "./carousel"
import { NavLink } from "react-router-dom";

function PropertyCard(props) {  
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <Carousel pid={props.pid}/>
                <div className="card-body">
                    <p className="card-text">
                        {props.name}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <NavLink to="./viewproperty.html" className="btn btn-sm btn-outline-secondary">Reserve!</NavLink>
                        <small className="text-muted">${props.price} {props.currency}/day</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard