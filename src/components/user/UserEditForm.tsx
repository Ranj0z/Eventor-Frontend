import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'; // Import useSelector
import type { TUser } from "./UserCardTemplate"; // Assuming TUser is defined here
import type { RootState } from "../../app/store";

interface UserEditFormProps {
  user: TUser; // The user object to be edited
  onSave: (updatedUser: TUser) => void; // Callback when changes are saved
  onCancel: () => void; // Callback when editing is cancelled
}

const UserEditForm: React.FC<UserEditFormProps> = ({ user, onSave, onCancel }) => {
  // State to hold the form data, initialized with the current user's details
  const [formData, setFormData] = useState<TUser>(user);

  // Get the logged-in user's role from Redux state
  const loggedInUserRole = useSelector((state: RootState) => state.user.user?.role);

  // Update form data if the user prop changes (e.g., when a different user is selected for editing)
  useEffect(() => {
    setFormData(user);
  }, [user]);

  // Handle input changes and update the form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle role upgrade/downgrade
  const handleRoleChange = (newRole: 'user' | 'host') => {
    setFormData((prevData) => ({
      ...prevData,
      role: newRole,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the onSave callback with the updated user data
    // Ensure that UserID, createdAt, isVerified, and image_url are preserved
    onSave({
      ...formData,
      UserID: user.UserID, // Preserve original UserID
      createdAt: user.createdAt, // Preserve original createdAt
      isVerified: user.isVerified, // Preserve original isVerified
      image_url: user.image_url, // Preserve original image_url
    });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit User Details</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel" // Use type="tel" for phone numbers
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3} // Provide a few rows for better usability
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        {/* Conditional Role Section */}
        {loggedInUserRole === 'admin' ? (
          // Admin can change any user's role
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="Admin">Admin</option>
              <option value="Host">Host</option>
              <option value="User">User</option>
            </select>
          </div>
        ) : (
          // Non-admin users (Host or User)
          // Only show role change options if editing their own profile and not an Admin
          (loggedInUserRole === 'host' || loggedInUserRole === 'user') && user.UserID === useSelector((state: RootState) => state.user.user?.UserID) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Role: <span className="font-semibold">{formData.role}</span>
              </label>
              {loggedInUserRole === 'user' && (
                <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200 text-blue-800">
                  <p className="text-sm mb-2">Want to upgrade to a Host account?</p>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('host')}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Upgrade to Host
                  </button>
                </div>
              )}
              {loggedInUserRole === "host" && (
                <div className="mt-2 p-3 bg-yellow-50 rounded-md border border-yellow-200 text-yellow-800">
                  <p className="text-sm mb-2">Want to downgrade to a User account?</p>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('user')}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-yellow-600 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                  >
                    Downgrade to User
                  </button>
                </div>
              )}
            </div>
          )
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button" // Important: type="button" to prevent form submission
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
