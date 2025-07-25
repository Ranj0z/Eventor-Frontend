import React, { useState } from "react";
import UserModal from "./UserModal";
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { useDeleteUserMutation, useUpdateUserMutation } from "../../reducers/Users/usersAPI"; // Import mutations
import { loginSuccess } from "../../reducers/Login/userSlice"; // Import loginSuccess to update user in store
import type { RootState } from '../../app/store'; // Import RootState

export type TUser = {
  UserID: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Password can be optional for TUser when fetched or updated
  phoneNumber: string;
  address: string;
  role: "admin" | "host" | "user"; // Ensured role type matches backend API
  isVerified: boolean;
  image_url: string | null; // Retained as string | null for local component usage
  verificationCode?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

const UserCard: React.FC<{ user: TUser }> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.user.user); // Get logged-in user from Redux

  // Initialize RTK Query mutations
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation(); // For general user updates

  // Function to handle user deletion
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser({ id: userId }).unwrap();
      alert("User deleted successfully!"); // Using alert for simplicity, consider a custom modal
      setIsModalOpen(false); // Close modal after successful deletion
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Please try again."); // Using alert for simplicity
    }
  };

  // Function to handle user updates from the UserEditForm
  const handleUserUpdate = async (updatedUser: TUser) => {
    try {
      // Prepare payload for updateUser mutation
      const { UserID, image_url, createdAt, updatedAt, ...rest } = updatedUser;
        const payload = {
        id: UserID,
        ...rest,
        image_url: image_url === null ? "" : image_url,
        role: updatedUser.role.toLowerCase() as "admin" | "host" | "user",
        verificationCode: updatedUser.verificationCode ?? undefined,
        createdAt: createdAt ?? undefined,
        updatedAt: updatedAt ?? undefined,
        };

      // Call the updateUser mutation
      const result = await updateUser(payload).unwrap();
        // Get token from Redux state (adjust selector as needed)
        const token = useSelector((state: RootState) => state.user.token);

      // If the updated user is the currently logged-in user, update the Redux store
      if (loggedInUser && loggedInUser.UserID === result.UserID) {
        // The API returns the updated user, use it to update the Redux store
        // You'll need the actual token from your Redux state if it's not managed differently
        dispatch(loginSuccess({ token: token || "", user: result }));
      }

      alert("User updated successfully!"); // Using alert for simplicity
      setIsModalOpen(false); // Close modal after successful update
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update user. Please try again."); // Using alert for simplicity
    }
  };

  return (
    <>
      <div className="relative w-full max-w-xs mx-auto">
        {/* Main Card - Now Clickable */}
        <div
          className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-6 shadow-2xl border border-purple-200 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:border-purple-300"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-400/20 rounded-full blur-xl"></div>

          {/* Profile Section */}
          <div className="relative z-10 flex flex-col items-center space-y-4">
            {/* Avatar with Glow Effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-40 animate-pulse"></div>
              <img
                src={
                  user.image_url ||
                  `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=8b5cf6&color=ffffff&size=96`
                }
                alt="User Avatar"
                className="relative w-20 h-20 rounded-full object-cover border-2 border-purple-300 shadow-lg"
              />
              {/* Verification Badge */}
              {user.isVerified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {user.firstName} {user.lastName}
              </h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-300">
                {user.role}
              </div>
            </div>

            {/* Contact Info */}
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="truncate">{user.email}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{user.phoneNumber}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{user.address}</span>
              </div>
            </div>

            {/* Status & Join Date */}
            <div className="w-full pt-3 border-t border-purple-200">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${user.isVerified ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-500">
                    {user.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                {user.createdAt && (
                  <span className="text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with user data */}
      <UserModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={() => { /* This prop is now primarily handled internally by UserModal's state */ }}
        onDelete={handleDeleteUser} // Pass the delete handler
        onUserUpdate={handleUserUpdate} // Pass the update handler
      />
    </>
  );
};

export default UserCard;
