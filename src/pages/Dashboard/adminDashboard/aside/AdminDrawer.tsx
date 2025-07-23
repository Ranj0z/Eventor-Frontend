import { Link } from "react-router";
import { adminDrawerData } from "./drawerData";

const AdminDrawer = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-yellow-400 p-4 ">
        Dashboard Menu
      </h2>
      <ul>
        {adminDrawerData.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center gap-4 p-4 hover:bg-gray-900 transition-colors duration-200"
            >
              <item.icon size={24}  className="text-yellow-400" />
              <span className="text-lg text-white">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDrawer;
