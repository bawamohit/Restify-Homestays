import { useEffect, useState } from "react";

var token = localStorage.getItem('accessToken')

function ShowReservationsHost() {
  const [reservation, setReservation] = useState([]);
  const [query, setQuery] = useState({search: "", page: 1 });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query.page === 1) {
      fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-host/', {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error('Requested resource not found');
          } else {
            throw new Error('Server error');
          }
        })
        .then(json => {

          if(query.search === ""){
            setReservation(json.results);
            setTotalPages(Math.max(Math.ceil(json.count / 2), 1));
          }else{
            setReservation(json.results.filter((reservation) => reservation.status === query.search));
            setTotalPages(Math.max(Math.ceil((json.results.filter((reservation) => reservation.status === query.search).length) / 2), 1));
          }
          
        }).catch(error => {

          console.log(error);
        })
    } else {
      fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-host/?page=' + query.page, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 404) {
            throw new Error('Requested resource not found');
          } else {
            throw new Error('Server error');
          }
        })
        .then(json => {
          if(query.search === ""){
            setReservation(json.results);
            setTotalPages(Math.max(Math.ceil(json.count / 2), 1));
          }else{
            setReservation(json.results.filter((reservation) => reservation.status === query.search));
            setTotalPages(Math.max(Math.ceil((json.results.filter((reservation) => reservation.status === query.search).length) / 2), 1));
          }
          if(totalPages === 0){
            setTotalPages(1);
          }
        }).catch(error => {

          console.log(error);
        })
    }

  }, [query])
  return (
    <div class="container text-center">
      <div class="pt-5 pb-5 btn-group" role="group" aria-label="Button group with 7 buttons">
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "", page: 1 })}>All</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "Pending", page: 1 })}>Pending</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "PendingCancel", page: 1 })}>PendingCancel</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "Denied", page: 1 })}>Denied</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "Expired", page: 1 })}>Expired</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "Approved", page: 1 })}>Approved</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "Canceled", page: 1 })}>Canceled</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "Terminated", page: 1 })}>Terminated</button>
        <button type="button" class="btn btn-secondary" onClick={() => setQuery({ search: "Completed", page: 1 })}>Completed</button>
      </div>
      <h2 class="pt-5 pb-5 text-secondary text-center">Upcoming Host</h2>
      <div class="accordion" id="reservationList">
        {reservation.map(reservation => (
          <div class="accordion-item" >
            <h2 class="accordion-header" id="${reservation.id}">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Reservation at Rock house 120 Couch Street
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="${reservation.id}" data-bs-parent="#reservationList">
              <div class="accordion-body bg-light">
                <div class="row pt-2">
                  <div class="col-lg-3 col-md-4 col-6">
                    Start Date: {reservation.res_start_time}
                  </div>
                  <div class="col-lg-3 col-md-4 col-6">
                    End Date: {reservation.res_end_time}
                  </div>
                  <div class="col-lg-3 col-md-4 col-6">
                    No.Guests: 2
                  </div>
                  <div class="col-lg-3 col-md-4 col-6">
                    Price: ${reservation.price}
                  </div>
                </div>
                {(() => {
                  switch (reservation.status) {
                    case "Pending":
                      return (
                        <div class="d-flex pt-4 justify-content-between" >
                          <div>
                            <a href="#" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                            <a href="#" class="btn float-right" style={{background: '#85bded'}} data-bs-toggle="modal" data-bs-target="#guests-modal">User Rating</a>
                          </div>
                          <div>
                            <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#accept-modal">Accept</a>
                            <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deny-modal">Deny</a>
                          </div>
                        </div>);

                    case "PendingCancel":
                      return (
                        <div class="d-flex pt-4 justify-content-between" >
                          <div>
                            <a href="#" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                            <a href="#" class="btn float-right" style={{background: '#85bded'}} data-bs-toggle="modal" data-bs-target="#guests-modal">User Rating</a>
                          </div>
                          <div>
                            <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#accept-modal">Accept Cancel</a>
                            <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deny-modal">Deny Cancel</a>
                          </div>
                        </div>);

                    case "Denied":
                      return (<div class="d-flex justify-content-between pt-4" >
                        <a href="#" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                      </div>);

                    case "Expired":
                      return (<div class="d-flex justify-content-between pt-4" >
                        <a href="#" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                      </div>);

                    case "Approved":
                      return (<div class="d-flex pt-4 justify-content-between" >
                        <div>
                          <a href="#" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                          <a href="#" class="btn float-right" style={{background: '#85bded'}} data-bs-toggle="modal" data-bs-target="#guests-modal">User Rating</a>
                        </div>
                        <div>
                          <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#terminate-modal">Terminate</a>
                        </div>
                      </div>);

                    case "Canceled":
                      return (<div class="d-flex justify-content-between pt-4" >
                        <a href="viewproperty.html" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                      </div>);

                    case "Terminated":
                      return (<div class="d-flex justify-content-between pt-4" >
                        <a href="viewproperty.html" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                      </div>);

                    case "Completed":
                      return (<div class="d-flex justify-content-between pt-4" >
                        <a href="viewproperty.html" class="btn float-left" style={{background: '#85bded'}}>Details</a>
                        <a href="#" class="btn btn-secondary float-right" data-bs-toggle="modal" data-bs-target="#user-rate-modal">Rate this user</a>
                      </div>);
                  }
                })()}

              </div>
            </div>
          </div>
        ))}
      </div>
      <p>
        {query.page > 1
          ? <button onClick={() => setQuery({
            ...query, page: query.page - 1
          })}>Previous</button>
          : <></>
        }
        {query.page < totalPages
          ? <button onClick={() => setQuery({
            ...query, page: query.page + 1
          })}>Next</button>
          : <></>
        }
      </p>
      <p>Page {query.page} out of {totalPages}.</p>
    </div>
  );
}
export default ShowReservationsHost;

//list of reservations, should be the page where you can filter out reservations by status