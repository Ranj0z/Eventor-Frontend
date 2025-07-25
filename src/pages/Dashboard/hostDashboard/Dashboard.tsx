import { useEffect, useState } from "react";
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

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [drawerOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            bg-purple-700 text-white w-64 z-50
            fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out
            ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0 lg:block
          `}
        >
          <div className="relative h-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoCloseSharp />
            </button>
            <HostDrawer />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Topbar */}
          <div className="flex items-center px-4 py-4 bg-purple-700 shadow ">
            <button
              className="mr-4 text-white text-2xl"
              onClick={handleDrawerToggle}
            >
              {drawerOpen ? <IoCloseSharp /> : <FaBars />}
            </button>
            <h1 className="text-yellow-400 text-lg sm:text-xl font-bold tracking-wide">
              Welcome to your Host Dashboard
            </h1>
          </div>

          {/* Routed content */}
          <main className="flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto text-black">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HostDashboard;
