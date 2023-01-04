
import { Outlet, Route, Routes } from "react-router-dom"
import { CragDetails } from "../Crags/CragDetails"
import { BoulderContainer } from "../Boulders/BoulderContainer"
import { Profile } from "../User/Profile"
import { MapDisplay } from "../Map/MapDisplay"
import { Explore } from "../Crags/Explore"
import { GetWeather } from "../weather/GetWeather"
import { Home } from "../Home/Home"


export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<Outlet />
				</>
			}>
                <Route path="crags" element={ <Explore/>} />
    
                <Route path="crags/:cragId" element={ <CragDetails />} />
                <Route path="profile" element={ <Profile />} />
				<Route path="home" element={ <Home /> } />
			</Route>
		</Routes>
	)
}
