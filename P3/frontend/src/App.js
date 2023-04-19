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
import MyProperties from './pages/myproperties'
import PropertyView from './pages/propertyview'
import PropertyViewGuest from './pages/propertyviewguest'
import ShowNotifications from './pages/notifications';
import ShowReservationsStay from './pages/reservationsstay';
import ShowReservationsHost from './pages/reservationshost';
import Profile from './pages/profile';

function App() {
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        var token = localStorage.getItem('accessToken')
        if (token) {
            fetch('http://localhost:8000/accounts/update-user', {
                headers: { 'Authorization': 'Bearer ' + token }
            }).then(response => response.json())
            .then(json => {
                setAuthorized(true)
                localStorage.setItem('id', json.id)
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
                <Route path="host" element={<MyProperties />} />
                <Route path="create" element={<PropertyCreate />} />
                <Route path="view/:pid" element={<PropertyView />} />
                <Route path="edit/:pid" element={<PropertyEdit />} />
                {/* <Route path="guestview" element={<PropertyViewGuest />} />
                <Route path="amenities" element={<Amenities />} />
                <Route path="amenitiesedit" element={<AmenitiesEdit />} /> */}
            </Route>
            <Route path="/account/">
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<ShowNotifications />} />
            </Route>
        </Routes>
        <Footer />
        
    </BrowserRouter>
}
export default App;
