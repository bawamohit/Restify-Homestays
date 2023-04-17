import { useState, useEffect } from "react"

function Carousel(props) {
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_API + "properties/property-image-list/" + props.pid)
            .then(response => response.json())
            .then(json => {
                setImages(json)
            })
    }, [])

    return (
        <div id={`property_${props.pid}_carousel`} className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
                {images.map((image, i) => {
                    if (i === 0) {
                        return <button key={image.id} type="button" data-bs-target={`#property_${props.pid}_carousel`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i+1}`}></button>
                    }
                    return <button key={image.id} type="button" data-bs-target={`#property_${props.pid}_carousel`} data-bs-slide-to={i} aria-label={`Slide ${i+1}`}></button>
                })}
            </div>
            <div className="carousel-inner">
                {images.map((image, i) => {
                    if (i === 0) {
                        return <div key={image.id} className="carousel-item active"><img src={image.image} className="d-block w-100" alt="..."></img></div>
                    }
                    return <div key={image.id} className="carousel-item"><img src={image.image} className="d-block w-100" alt="..."></img></div>
                })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#property_${props.pid}_carousel`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#property_${props.pid}_carousel`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
