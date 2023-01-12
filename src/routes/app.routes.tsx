import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Login } from "../pages/Login";
import { CreateAccount } from "../pages/CreateAccount";
import { ForgotPassword } from "../pages/ForgotPassword";
import { MyTravels } from "../pages/MyTravels";
import { Home } from "../pages/Home";
import { Footer } from "../components/Footer";
import { Travels } from "../pages/Travels";
import { Nav } from "../components/Nav";
import { AuthContext } from "../context/auth/AuthContext";
import { MyTravelsDriver } from "../pages/MyTravelsDriver";
import { CreateTravel } from "../pages/CreateTravel";
import { TravelProfile } from "../pages/TravelProfile";
import { EditTravel } from "../pages/EditTravel";
import { EditMyProfile } from "../pages/EditMyProfile";
import { Messages } from "../pages/Messages";
import ScrollToTop from "../ScrollToTop";
import { useContext, useState } from "react";

export const AppRoutes = () => {

    const [currentNav, setCurrentNav] = useState("");

    const auth = useContext(AuthContext);

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Login />} />
                <Route path="/create-new-travel" element={<CreateTravel />} />
                <Route path="/edit-travel/:id" element={<EditTravel />} />
                <Route path="/my-travels-driver" element={<MyTravelsDriver />} />
                <Route path="/my-travels" element={<MyTravels />} />
                <Route path="/edit-my-profile" element={<EditMyProfile />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/travel-profile/:id" element={<TravelProfile />} />
                <Route
                    path="/travels"
                    element={
                        <Travels currentNav={currentNav} setCurrentNav={setCurrentNav} />
                    }
                />
                <Route path="/create-account/:key" element={<CreateAccount />} />
                <Route path="/forgot-password/:key" element={<ForgotPassword />} />
            </Routes>

            {auth.user && auth.showNav === true &&
                <Nav auth={auth} />
            }
            {!auth.user && currentNav !== `/` && <Footer />}
        </Router>
    )
}