// pages/Dashboard/hostDashboard/Dashboard.tsx
import { useState } from "react";
import { Outlet } from "react-router";
import HostDrawer from "./aside/HostDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/nav/Navbar";

const HostDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col ">
      <div className="min-h-screen">
      <Navbar />

      <div className="flex flex-1 ">
        <aside
          className={`
            bg-purple-700 text-white w-64 
            lg:block ${drawerOpen ? "block fixed z-50 h-full" : "hidden"} 
            lg:static
          `}
        >
          <div className="relative h-full">
            <button
              className="absolute top-4 right-4 text-black text-2xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoCloseSharp />
            </button>
            <HostDrawer />
          </div>
        </aside>

        <div className="flex flex-col flex-1">
          <div className="flex items-center px-4 py-4 bg-purple-700 shadow">
            <button className="mr-4 text-white text-2xl lg:hidden" onClick={handleDrawerToggle}>
              {drawerOpen ? <IoCloseSharp /> : <FaBars />}
            </button>
            <h1 className="text-yellow-400 text-2xl font-extrabold">Welcome to your Host Dashboard</h1>
          </div>

          <main className="flex-1 bg-gray-50 p-4 text-white">
            <Outlet />
          </main>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default HostDashboard;

