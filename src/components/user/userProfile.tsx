// src\components\user\userProfile.tsx

import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return null; // You said this shouldn't happen — so this is just a safety fallback.

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
            src={
              user.image_url ||
              `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
            }
            alt="Profile"
          />
        </div>

        <div className="text-center sm:text-left space-y-2 w-full">
          <h2 className="text-2xl font-bold text-purple-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phoneNumber}</p>
          <p className="text-gray-600">{user.address}</p>

          <div className="mt-2 space-x-2">
            <span className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full capitalize">
              {user.role}
            </span>
            {user.isVerified ? (
              <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                Verified
              </span>
            ) : (
              <span className="inline-block px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                Not Verified
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
