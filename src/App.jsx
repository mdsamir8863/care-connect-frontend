import { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import AllDoctor from "./Pages/AllDoctor";
import MessageForm from "./components/MessageForm";
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  //   function getAllCookies() {
  //     let cookies = document.cookie.split('; ');
  //     let cookieObject = {};
  //     cookies.forEach(cookie => {
  //         let [name, value] = cookie.split('=');
  //         cookieObject[name] = decodeURIComponent(value);
  //     });
  //     return cookieObject;
  // }
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      }
    };

    if (document.cookie) {
      fetchUser();
    }
  }, []);
  // useEffect(() => {
  //   console.log(getAllCookies());
  //   if(document.cookie){
  //     const fetchUser = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:4000/api/v1/user/patient/me",
  //           {
  //             withCredentials: true,
  //           }
  //         );
  //         setIsAuthenticated(true);
  //         setUser(response.data.user);
  //       } catch (error) {
  //         setIsAuthenticated(false);
  //         setUser({});
  //       }
  //     };
  //     fetchUser();
  //   }
  // }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/appointment" element={<Appointment />} /> */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<AllDoctor />} />
          <Route path="/appointment" element={<MessageForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
