import Carousel from "./carousel"
import { NavLink } from "react-router-dom";

function MyPropertyCard(props) {  
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <Carousel pid={props.pid}/>
                <div className="card-body">
                    <p className="card-text">
                        {props.name}
                    </p>
                    <div className="d-flex gap-1 justify-content-between align-items-center">
                        <NavLink to={"/properties/edit/" + props.pid} className="btn btn-sm btn-outline-secondary">Edit</NavLink>
                        <NavLink to={"/properties/view/" + props.pid} className="btn btn-sm btn-outline-secondary">View</NavLink>
                        <small className="text-muted ms-auto">${props.price} {props.currency}/day</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPropertyCard