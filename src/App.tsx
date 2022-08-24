import { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Login } from "../src/pages/Login";
import toast, { Toaster } from "react-hot-toast";
import { CreateAccount } from "../src/pages/CreateAccount";
import { ForgotPassword } from "../src/pages/ForgotPassword";
import { Home } from "../src/pages/Home";
import { Footer } from "../src/components/Footer";
import { Travels } from "../src/pages/Travels";
import { Nav } from "../src/components/Nav";
import { AuthContext } from "./context/auth/AuthContext";

function App() {
  const [currentNav, setCurrentNav] = useState("");

  const auth = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/travels"
            element={
              <Travels currentNav={currentNav} setCurrentNav={setCurrentNav} />
            }
          />
          <Route path="/create-account/:key" element={<CreateAccount />} />
          <Route path="/forgot-password/:key" element={<ForgotPassword />} />
        </Routes>
        <div className="not_hide">
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </div>
        {auth.user && (
          <Nav currentNav={currentNav} setCurrentNav={setCurrentNav} />
        )}
        {!auth.user && <Footer />}
      </Router>
    </>
  );
}

export default App;
