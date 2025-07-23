
// pages/Dashboard/hostDashboard/aside/HostDrawer.tsx
import { Link } from "react-router";
import { hostDrawerData } from "./drawerData";

const HostDrawer = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-yellow-400 p-4 ">
        Dashboard Menu
      </h2>
      <ul>
        {hostDrawerData.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center gap-4 p-4 hover:bg-gray-900 transition-colors duration-200"
            >
              <item.icon size={30} />
              <span className="text-xl text-gray-100 mb-2">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostDrawer;
