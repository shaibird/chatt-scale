import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import './MapDisplay.css'
import { MapPopUp } from './MapPopUp'

export const MapDisplay = () => {
    const [boulderfield, setBoulderfield] = useState([])
    const [selectedCrag, setSelectedCrag] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/crags`)
                .then(response => response.json())
                .then((cragArray) => {
                    setBoulderfield(cragArray)
                })
        },
        []
    )

    return (
        <MapContainer center={[35.045761, -85.308289]} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {boulderfield.map(
            (crag) => {  
            return( <Marker 
                key= {crag.id} 
                position={[crag.lat, crag.lon]}>
                <Popup>
                    <MapPopUp crag={crag}/>
                </Popup>
                </Marker> )
                    
        })}
        </MapContainer>
      );
    }


