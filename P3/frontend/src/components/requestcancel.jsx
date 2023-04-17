
var token = localStorage.getItem('accessToken')
function RequestCancel(props) {
    const reservation = props.reservation;
    return (
        <div className="modal fade" id="cancel-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cancel</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            Accepted Reservations are canceled only by the host's approval. Do you want to request for cancelation?
                        </div>
                        <button type="button" className="btn btn-danger float-right" data-bs-dismiss="modal" onClick={() =>
                        fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-cancel/' + reservation + '/', {
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
export default RequestCancel;