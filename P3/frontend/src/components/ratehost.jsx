

function RateHost() {
    return (
        <div className="modal fade" id="host-rate-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Rate This Host</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body justify-content-between">
                        <div className="mb-3">
                            How would you rate Squidward?
                        </div>
                        <form className="pb-2">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-secondary">1</button>
                                <button type="button" className="btn btn-secondary">2</button>
                                <button type="button" className="btn btn-secondary">3</button>
                                <button type="button" className="btn btn-secondary">4</button>
                                <button type="button" className="btn btn-secondary">5</button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Leave a comment</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </form>
                        <button className="btn btn-success">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RateHost;

