import { useEffect, useState } from "react";

import Accept from "../components/accept";
import AcceptCancel from "../components/acceptcancel";
import Deny from "../components/deny";
import DenyCancel from "../components/denycancel";
import Terminate from "../components/terminate";
import Addr from "../components/addr";
import LeaveUserRating from "../components/leaveuserrating";
import UserRating from "../components/userrating1";

var token = localStorage.getItem('accessToken')

function ShowReservationsHost() {
  const [reservation, setReservation] = useState([]);
  const [query, setQuery] = useState({ search: "", page: 1 });
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    if (query.page === 1) {
      fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-status/?hostuser=host&status=' + query.search, {
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
          setTotalPages(Math.max(Math.ceil(json.count / 3), 1));

        }).catch(error => {

          console.log(error);
        })
    } else {
      fetch(process.env.REACT_APP_BACKEND_API + 'properties/reservation-status/?hostuser=host&page=' + query.page + '&status=' + query.search, {
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
          setTotalPages(Math.max(Math.ceil(json.count / 3), 1));
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

      <div className="pt-5 pb-5 btn-group btn-group-md flex-wrap" role="group" aria-label="Button group with 7 buttons">
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
      <h2 className="pt-5 pb-5 text-secondary text-center">Hostings</h2>
      <div className="accordion" id="reservationList">
        {reservation.map(reservation => {
          return (
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
                              < UserRating />
                              <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                              <button className="btn float-right" style={{ background: '#85bded' }} data-bs-toggle="modal" data-bs-target="#guests-modal">User Rating</button>
                            </div>
                            <Accept reservation={reservation.id} onButtonClick={refresh} />
                            <Deny reservation={reservation.id} onButtonClick={refresh} />
                            <div>
                              <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#accept-modal">Accept</button>
                              <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deny-modal">Deny</button>
                            </div>
                          </div>);

                      case "PendingCancel":
                        return (
                          <div className="d-flex pt-4 justify-content-between" >
                            <UserRating />
                            <div>
                              <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                              <button className="btn float-right" style={{ background: '#85bded' }} data-bs-toggle="modal" data-bs-target="#guests-modal">User Rating</button>
                            </div>
                            <DenyCancel reservation={reservation.id} onButtonClick={refresh} />
                            <AcceptCancel reservation={reservation.id} onButtonClick={refresh} />
                            <div>
                              <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#accept-cancel-modal">Accept Cancel</button>
                              <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deny-cancel-modal">Deny Cancel</button>
                            </div>
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
                          < UserRating />
                          <div>
                            <button className="btn float-left" style={{ background: '#85bded' }}>Details</button>
                            <button className="btn float-right" style={{ background: '#85bded' }} data-bs-toggle="modal" data-bs-target="#guests-modal">User Rating</button>
                          </div>
                          <Terminate reservation={reservation.id} onButtonClick={refresh} />
                          <div>
                            <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#terminate-modal">Terminate</button>
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
                          <LeaveUserRating />
                          <button className="btn btn-secondary float-right" data-bs-toggle="modal" data-bs-target="#user-rate-modal">Rate this user</button>
                        </div>);

                      default:
                        return null;
                    }
                  })()}

                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="pt-5">
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