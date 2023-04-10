import Carousel from "./carousel"

function PropertyCards() {
    return (
        <div class="album my-4">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div class="col">
                        <div class="card h-100 shadow-sm">
                            <div id="pineapple-placeholder"><Carousel /></div>
                            <div class="card-body">
                                <p class="card-text">
                                    Pineapple House
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <a href="./viewproperty.html" class="btn btn-sm btn-outline-secondary">Reserve!</a>
                                    <small class="text-muted">$200 CAD/day</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 shadow-sm">
                            <div id="moai-placeholder"><Carousel /></div>
                            <div class="card-body">
                                <p class="card-text">
                                    Moai House
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <a href="./viewpropertymoai.html" class="btn btn-sm btn-outline-secondary">Reserve!</a>
                                    <small class="text-muted">$200 CAD/day</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100 shadow-sm">
                            <div id="rock-placeholder"><Carousel /></div>
                            <div class="card-body">
                                <p class="card-text">
                                    Rock House
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Reserve!</button>
                                    <small class="text-muted">$300 CAD/day</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCards