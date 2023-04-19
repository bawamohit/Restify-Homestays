import { useEffect, useState } from "react";


import Cancel from "../components/cancel";
import RequestCancel from "../components/requestcancel";
import Addr from "../components/addr";

var token = localStorage.getItem('accessToken')

function ShowReservationsStay() {
  const [reservation, setReservation] = useState([]);
  const [query, setQuery] = useState({ search: "", page: 1 });
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)

  useEffect(() => {
    if (query.page === 1) {
      fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-status/?hostuser=user&status=' + query.search, {
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
          setReservation(json.results);
          setNext(json.next)
          setPrevious(json.previous)

        }).catch(error => {

          console.log(error);
        })
    } else {
      fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-status/?hostuser=user&page=' + query.page + '&status=' + query.search, {
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
          setReservation(json.results);
          setNext(json.next)
          setPrevious(json.previous)
        }).catch(error => {

          console.log(error);
        })
    }

  }, [query])

  function refresh() {
    setQuery({ ...query, page: query.page });
  }

  return (
    <div className="container text-center">
        <h2 className="py-4 text-secondary text-center">Stays</h2>

      <div className="pb-4 btn-group btn-group-md flex-wrap" role="group" aria-label="Button group with 7 buttons">
        <div className="btn-group">
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "", page: 1 })}>All</button>
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "Pending", page: 1 })}>Pending</button>
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "PendingCancel", page: 1 })}>PendingCancel</button>
        </div>

        <div className="btn-group">
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "Denied", page: 1 })}>Denied</button>
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "Expired", page: 1 })}>Expired</button>
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "Approved", page: 1 })}>Approved</button>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "Canceled", page: 1 })}>Canceled</button>
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "Terminated", page: 1 })}>Terminated</button>
          <button type="button" className="btn btn-secondary" onClick={() => setQuery({ search: "Completed", page: 1 })}>Completed</button>
        </div>
      </div>

      <div className="accordion" id="reservationList">
        {reservation.map(reservation => (
          <div className="accordion-item" key={reservation.id} >
            <h2 className="accordion-header" id={reservation.id}>
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <div>
                  <div class="col-12">
                    Reservation at <Addr property={reservation.property} />
                  </div>
                  <div class="col-12">
                    Status: {reservation.status}
                  </div>
                </div>
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby={reservation.id} data-bs-parent="#reservationList">
              <div className="accordion-body bg-light">
                <div className="row pt-2">
                  <div className="col-lg-3 col-md-4 col-6">
                    Start Date: {reservation.res_start_time}
                  </div>
                  <div className="col-lg-3 col-md-4 col-6">
                    End Date: {reservation.res_end_time}
                  </div>
                  <div className="col-lg-3 col-md-4 col-6">
                    No.Guests: {reservation.guests}
                  </div>
                  <div className="col-lg-3 col-md-4 col-6">
                    Price: ${reservation.price}
                  </div>
                </div>
                {(() => {
                  switch (reservation.status) {
                    case "Pending":
                      return (
                        <div className="d-flex pt-4 justify-content-between" >
                          <div>
                            <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                            <button className="btn float-right" style={{ background: '#85bded' }} data-bs-toggle="modal" data-bs-target="#guests-modal">User Rating</button>
                          </div>
                          <Cancel reservation={reservation.id} onButtonClick={refresh} />
                          <div>
                            <button class="btn btn-danger float-right" data-bs-toggle="modal" data-bs-target="#cancel-pending-modal">Cancel</button>
                          </div>
                        </div>);

                    case "PendingCancel":
                      return (<div className="d-flex justify-content-between pt-4" >
                        <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                      </div>);

                    case "Denied":
                      return (<div className="d-flex justify-content-between pt-4" >
                        <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                      </div>);

                    case "Expired":
                      return (<div className="d-flex justify-content-between pt-4" >
                        <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                      </div>);

                    case "Approved":
                      return (<div className="d-flex pt-4 justify-content-between" >
                        <div>
                          <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                        </div>
                        <RequestCancel reservation={reservation.id} onButtonClick={refresh} />
                        <div>
                          <button class="btn btn-danger float-right" data-bs-toggle="modal" data-bs-target="#cancel-modal">Cancel</button>
                        </div>
                      </div>);

                    case "Canceled":
                      return (<div className="d-flex justify-content-between pt-4" >
                        <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                      </div>);

                    case "Terminated":
                      return (<div className="d-flex justify-content-between pt-4" >
                        <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                      </div>);

                    case "Completed":
                      return (<div className="d-flex justify-content-between pt-4" >
                        <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>

                      </div>);

                    default:
                      return null;
                  }
                })()}

              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <p className="pt-5">
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
      <p>Page {query.page} out of {totalPages}.</p> */}
        <div className="ms-auto me-auto" style={{maxWidth: "700px"}}>
            <div className="d-flex justify-content-between" style={{ maxWidth: "700px" }}>
                {previous ? <button className="btn btn-secondary my-5" type="button" onClick={() => { setQuery({ search: query.search, page: query.page - 1 }) }}>Previous Page</button> : 
                    <button className="btn btn-outline-secondary my-5" type="button" disabled>Previous Page</button>}
                {next ? <button className="btn btn-secondary my-5" type="button" onClick={() => { setQuery({ search: query.search, page: query.page + 1 }) }}>Next Page</button> :
                    <button className="btn btn-outline-secondary my-5" type="button" disabled>Next Page</button>}
            </div>
        </div>
    </div>
  );
}
export default ShowReservationsStay;

//list of reservations, should be the page where you can filter out reservations by status