import { useState } from "react";
import { Outlet } from "react-router";
import AdminDrawer from "./aside/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/nav/Navbar";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            bg-purple-700 text-white w-64 
            lg:block ${drawerOpen ? "block fixed z-50 h-full" : "hidden"} 
            lg:static
          `}
        >
          <div className="relative h-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoCloseSharp />
            </button>
            <AdminDrawer />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <div className="flex items-center px-4 py-4 bg-purple-700 shadow">
            <button
              className="mr-4 text-white text-2xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              {drawerOpen ? <IoCloseSharp /> : <FaBars />}
            </button>
            <h1 className="text-yellow-400 text-2xl font-bold tracking-wide">
              Welcome to your Admin Dashboard
            </h1>
          </div>

          {/* Routed content */}
          <main className="flex-1 bg-gray-50 p-6 text-black">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
