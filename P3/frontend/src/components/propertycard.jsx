import Carousel from "./carousel"

function PropertyCard(props) {
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <img src={props.image}/>
                <div className="card-body">
                    <p className="card-text">
                        {props.name}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <a href="./viewproperty.html" className="btn btn-sm btn-outline-secondary">Reserve!</a>
                        <small className="text-muted">$200 CAD/day</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard