var token = localStorage.getItem('accessToken')

function AcceptCancel(props) {
    const reservation = props.reservation;
    return (<div className="modal fade" id="accept-cancel-modal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body">
                    <div className="mb-3">
                        Are you sure you want to accept this cancelation for existing reservation?
                    </div>
                    <button type="button" className="btn btn-danger float-right" data-bs-dismiss="modal" onClick={() =>
                        fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-approve-cancel/' + reservation + '/', {
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
export default AcceptCancel;