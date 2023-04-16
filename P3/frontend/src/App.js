import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';

// import components
import Navbar from './components/navbar'
import UserNavbar from './components/usernavbar';
import Footer from './components/footer';

// import pages
import PropertySearch from './pages/propertysearch';
import PropertyCreate from './pages/propertycreate'
import PropertyEdit from './pages/propertyedit'
import Amenities from './pages/amenities'
import AmenitiesEdit from './pages/amenitiesedit'
import MyProperties from './pages/myproperties'
import PropertyView from './pages/propertyview'
import PropertyViewGuest from './pages/propertyviewguest'
import ShowNotifications from './pages/notifications';
import ShowReservationsStay from './pages/reservationsstay';
import ShowReservationsHost from './pages/reservationshost';

function App() {
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        var token = localStorage.getItem('accessToken')
        if (token) {
            fetch('http://localhost:8000/accounts/update-user', {
                headers: { 'Authorization': 'Bearer ' + token }
            }).then(response => {
                if (response.ok) {
                    setAuthorized(true)
                }
                else {
                    setAuthorized(false)
                }
            })
        }
    }, [])

    function callback(data) {
        setAuthorized(data)
    }

    const [nav, setNav] = useState(<Navbar callback={callback} />)

    useEffect(() => {
        if (authorized) {
            setNav(<UserNavbar callback={callback} />)
        }
        else {
            setNav(<Navbar callback={callback} />)
        }
    }, [authorized])

    return <BrowserRouter>
        {nav}
        <Routes>
            <Route path="/" element={<PropertySearch />} />
            <Route path="/reservations/">
                <Route path="stay" element={<ShowReservationsStay />} />
                <Route path="host" element={<ShowReservationsHost />} />
            </Route>
            <Route path="/properties/">
                <Route path="create" element={<PropertyCreate />} />
                <Route path="edit" element={<PropertyEdit />} />
                <Route path="host" element={<MyProperties />} />
                <Route path="amenities" element={<Amenities />} />
                <Route path="amenitiesedit" element={<AmenitiesEdit />} />
                <Route path="view/:pid" element={<PropertyView />} />
                <Route path="guestview" element={<PropertyViewGuest />} />
            </Route>
            <Route path="/account/">
                <Route path="profile" element={<h1>profile</h1>} />
                <Route path="notifications" element={<ShowNotifications />} />
            </Route>
        </Routes>
        <Footer />
    </BrowserRouter>
}
export default App;
