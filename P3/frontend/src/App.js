import { BrowserRouter, Route, Routes } from 'react-router-dom'

// nav
import Navbar from './components/navbar'
import UserNavbar from './components/usernavbar';

// components or pages
import PropertyCreate from './components/propertycreate'
import PropertyEdit from './components/propertyedit'
import Amenities from './components/amenities'
import AmenitiesEdit from './components/amenitiesedit'
import MyProperties from './components/myproperties'
import PropertyView from './components/propertyview'

function App() {
  return <BrowserRouter>
    <UserNavbar/>
    <Routes>
      <Route path="/" element={<h1>home</h1>}>
        <Route path="dashboard" element={<h1>dash</h1>}/>
      </Route>
      <Route path="/stay/">
        <Route path="accepted" element={<h1>stay accepted</h1>}/>
        <Route path="pending" element={<h1>stay pending</h1>}/>
        <Route path="past" element={<h1>stay past</h1>}/>
      </Route>
      <Route path="/host/">
        <Route path="properties/">
          <Route path="create" element={<h1>host property create</h1>}/>
          <Route path="edit" element={<h1>host property edit</h1>}/>
        </Route>
        <Route path="accepted" element={<h1>host accepted</h1>}/>
        <Route path="pending" element={<h1>host pending</h1>}/>
        <Route path="past" element={<h1>host past</h1>}/>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App;
