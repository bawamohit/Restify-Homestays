import { useEffect, useState } from "react";
var token = localStorage.getItem('accessToken')
function Addr(props) {
    const [property, setProperty] = useState([]);
    const property_id = props.property;

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_API + 'properties/property-view/' + property_id, {headers: { 'Authorization': 'Bearer ' + token }})
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
            setProperty(json);
        }).catch(error => {
            console.log(error);
        })
    }, [props.property])

    return ( <span>{property.name} {property.address}</span>
    );
}
export default Addr;