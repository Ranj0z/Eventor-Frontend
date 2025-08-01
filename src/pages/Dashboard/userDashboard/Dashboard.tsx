// import { useEffect, useState } from "react";
// import { Outlet } from "react-router"; // Correct import for Outlet
// import UserDrawer from "./aside/UserDrawer";
// import { FaBars } from "react-icons/fa";
// import { IoCloseSharp } from "react-icons/io5";
// import Footer from "../../../components/footer/Footer";
// import Navbar from "../../../components/nav/Navbar";

// const UserDashboard = () => {
//   const [drawerOpen, setDrawerOpen] = useState(() =>
//     window.innerWidth >= 1024
//   );

//   const handleDrawerToggle = () => {
//     setDrawerOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       // On desktop (lg and up), always keep drawer open
//       if (window.innerWidth >= 1024) {
//         setDrawerOpen(true);
//       } else {
//         // On mobile, if drawer was open, keep it open, otherwise respect its current state
//         // setDrawerOpen(false); // Only uncomment if you *always* want it to close on mobile resize
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen overflow-x-hidden bg-purple-300">
//       <Navbar />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside
//           // Combined styling for desktop and mobile responsiveness
//           className={`
//             bg-purple-700 text-white h-full flex-shrink-0
//             transition-all duration-300 ease-in-out
//             ${
//               drawerOpen
//                 ? "w-64 min-w-[16rem] translate-x-0" // Drawer open: full width, visible
//                 : "w-0 overflow-hidden -translate-x-full" // Drawer closed: zero width, hidden, off-screen
//             }
//             lg:w-64 lg:min-w-[16rem] lg:static lg:translate-x-0 lg:overflow-visible // Desktop: always visible, static
//           `}
//         >
//           <div className="relative h-full">
//             {/* Close button for mobile/tablet when drawer is open */}
//             {drawerOpen && (
//               <button
//                 className="absolute top-4 right-4 text-white text-2xl lg:hidden"
//                 onClick={handleDrawerToggle}
//               >
//                 <IoCloseSharp />
//               </button>
//             )}
//             {/* Render UserDrawer content only if drawer is logically open */}
//             {drawerOpen && <UserDrawer />}
//           </div>
//         </aside>

//         {/* Main Content Area */}
//         <div className="flex flex-col flex-1 overflow-auto"> {/* Changed to overflow-auto for the main content itself */}
//           {/* Header (Top Bar) for the main content */}
//           <div className="flex items-center px-4 py-4 bg-purple-700 shadow z-10">
//             {/* Burger menu button for mobile/tablet when drawer is closed */}
//             {!drawerOpen && (
//               <button
//                 className="mr-4 text-white text-2xl lg:hidden" // Only show on smaller screens
//                 onClick={handleDrawerToggle}
//               >
//                 <FaBars />
//               </button>
//             )}
//             <h1 className="text-yellow-400 text-lg sm:text-xl font-bold tracking-wide">
//               Welcome to your User Dashboard
//             </h1>
//           </div>

//           {/* This is where the nested routes will render */}
//           <main className="flex-1 bg-gray-50 text-black p-4 md:p-6 overflow-y-auto"> {/* Added padding and overflow-y-auto for content */}
//             <Outlet />
//           </main>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default UserDashboard;