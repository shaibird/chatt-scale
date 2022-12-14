
import { Outlet, Route, Routes } from "react-router-dom"
import { CragDetails } from "../Crags/CragDetails"
import { BoulderContainer } from "../Boulders/BoulderContainer"
import { Profile } from "../User/Profile"


export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<Outlet />
				</>
			}>
                <Route path="crags" element={ <BoulderContainer />} />
    
                <Route path="crags/:cragId" element={ <CragDetails />} />
                <Route path="profile" element={ <Profile />} />
			</Route>
		</Routes>
	)
}
