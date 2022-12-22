
import { MapDisplay } from '../Map/MapDisplay'
import { CragListButton } from '../Map/CragListButton'

export const Explore = () => {
return (
    <div> 
    <CragListButton />
    
    <div className="map-container">
    <MapDisplay/>
    </div>
    </div>
  
)
}