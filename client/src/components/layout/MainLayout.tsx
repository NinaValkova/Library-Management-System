import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollToTop from "../common/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main-content container">
        <Outlet />
      </main>
       <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}