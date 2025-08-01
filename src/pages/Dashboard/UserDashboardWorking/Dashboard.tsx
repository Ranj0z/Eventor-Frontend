import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import UserDrawer from "./aside/UserDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/nav/Navbar";

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(() =>
    window.innerWidth >= 1024
  );

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDrawerOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-purple-300">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-purple-700 text-white transition-all duration-300 h-full ${
            drawerOpen ? "w-64 min-w-[16rem]" : "w-0 overflow-hidden"
          }`}
        >
          <div className="relative h-full">
            {drawerOpen && (
              <>
                <button
                  className="absolute top-4 right-4 text-white text-2xl lg:block"
                  onClick={handleDrawerToggle}
                >
                  <IoCloseSharp />
                </button>
                <UserDrawer />
              </>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header + Toggle */}
          <div className="flex items-center px-4 py-4 bg-purple-700 shadow z-10">
            {!drawerOpen && (
              <button
                className="mr-4 text-white text-2xl"
                onClick={handleDrawerToggle}
              >
                <FaBars />
              </button>
            )}
            <h1 className="text-yellow-400 text-lg sm:text-xl font-bold tracking-wide">
              Welcome to your User Dashboard
            </h1>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 text-black">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;