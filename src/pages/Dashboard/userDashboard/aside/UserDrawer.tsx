// // pages/Dashboard/userDashboard/aside/UserDrawer.tsx
// import { Link } from "react-router-dom"; // Use react-router-dom for Link
// import { userDrawerData } from "./drawerData";

// const UserDrawer = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-bold text-yellow-400 p-4 ">
//         Dashboard Menu
//       </h2>
//       <ul>
//         {userDrawerData.map((item) => (
//           <li key={item.id}>
//             <Link
//               to={item.link}
//               className="flex items-center gap-4 p-4 hover:bg-gray-900 transition-colors duration-200"
//             >
//               <item.icon size={24} className="text-yellow-400" /> {/* Apply size and color directly */}
//               <span className="text-lg text-white">{item.name}</span> {/* Standardize text size to match admin, text color to white */}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserDrawer;