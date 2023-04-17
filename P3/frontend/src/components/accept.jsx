
var token = localStorage.getItem('accessToken')
function Accept(props) {
    const reservation = props.reservation;
    return (<div className="modal fade" id="accept-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body">
                    <div className="mb-3">
                        Are you sure you want to accept this request for stay?
                    </div>
                    <button type="button" className="btn btn-success float-right" data-bs-dismiss="modal" onClick={() =>
                        fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-approve-pending/' + reservation + '/', {
                            method: 'POST',
                            headers: { 'Authorization': 'Bearer ' + token }
                        })
                            .then(response => {
                                props.onButtonClick();
                            })
                            .catch(error => {
                                // handle error
                            })}>Confirm</button>
                </div>
            </div>
        </div>
    </div>
    );
}
export default Accept;