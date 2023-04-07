import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Navbar from './components/navbar'

import PropertyCreate from './components/propertycreate'
import PropertyEdit from './components/propertyedit'
import Amenities from './components/amenities'
import AmenitiesEdit from './components/amenitiesedit'
import MyProperties from './components/myproperties'
import PropertyView from './components/propertyview'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <App />
  </React.StrictMode>
);

// <PropertyCreate />
// <PropertyEdit />
// <Amenities />
// <AmenitiesEdit />
// <<PropertyWasCreated />
// <MyProperties />
// <PropertyView />