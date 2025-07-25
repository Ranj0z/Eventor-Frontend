import React, { useState } from "react";
import type { TUser } from "./UserCardTemplate"; // Assuming TUser is defined here
import { Pencil } from 'lucide-react'; // Import the Pencil icon from lucide-react
import UserEditForm from './UserEditForm'; // Import the UserEditForm component

interface UserModalProps {
  user: TUser;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (user: TUser) => void; // Callback for edit action (now will trigger form display)
  onDelete: (userId: number) => void; // Callback for delete action
  onUserUpdate: (updatedUser: TUser) => void; // New prop for saving updated user data
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose,  onDelete, onUserUpdate }) => {
  // State to manage the visibility of the delete confirmation dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // State to manage whether the edit form is currently open
  const [isEditing, setIsEditing] = useState(false);

  // If the modal is not open, return null to render nothing
  if (!isOpen) return null;

  // Function to handle showing the delete confirmation
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  // Function to handle confirming the delete action
  const handleConfirmDelete = () => {
    onDelete(user.UserID); // Call the parent's onDelete function
    setShowDeleteConfirm(false); // Hide the confirmation dialog
    onClose(); // Close the main modal after deletion
  };

  // Function to handle canceling the delete action
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false); // Hide the confirmation dialog
  };

  // Function to handle clicking the edit button
  const handleEditClick = () => {
    setIsEditing(true); // Set edit mode to true
  };

  // Function to handle saving changes from the edit form
  const handleSaveEdit = (updatedUser: TUser) => {
    onUserUpdate(updatedUser); // Pass the updated user to the parent component
    setIsEditing(false); // Exit edit mode
  };

  // Function to handle canceling edit from the form
  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode
  };

  return (
    // Overlay for the main modal, covers the entire screen, centered
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose} // Close modal when clicking outside
    >
      {/* Modal content container */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 ease-out scale-95 opacity-0 animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        style={{ animationFillMode: 'forwards' }} // Keep the end state of the animation
      >
        {/* Close Button - positioned absolutely for easy access */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Edit Button - positioned at the top right with margin (only visible in view mode) */}
        {!isEditing && (
          <button
            onClick={handleEditClick} // Changed to open edit form
            className="absolute top-12 right-6 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-10"
            aria-label="Edit user"
          >
            <Pencil className="w-5 h-5" /> {/* Lucide Pencil icon */}
          </button>
        )}

        {/* Conditionally render UserEditForm or user details */}
        {isEditing ? (
          <UserEditForm
            user={user}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <div className="p-4 sm:p-6">
            {/* Header section: Avatar, Name, Role, Verification Status */}
            <div className="flex flex-col items-center text-center mb-4 sm:mb-6 gap-3">
              <div className="relative inline-block mb-2 sm:mb-3">
                {/* Blurred background effect for avatar */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30"></div>
                {/* User Avatar */}
                <img
                  src={
                    user.image_url ||
                    `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=8b5cf6&color=ffffff&size=100`
                  }
                  alt={`${user.firstName} ${user.lastName} Avatar`}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-3 border-purple-300 shadow-xl ring-3 ring-purple-100"
                />
                {/* Verified badge */}
                {user.isVerified && (
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <svg className="w-3 h-3 sm:w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {/* User Name */}
              <h1 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-0.5">
                {user.firstName} {user.lastName}
              </h1>
              {/* User Role */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-300 shadow-sm">
                {user.role}
              </div>
            </div>

            {/* Detailed Information Section */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              {/* Contact Information Card */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Contact Information</h3>
                <div className="space-y-2">
                  {/* Email */}
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-800 text-sm truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800 text-sm">{user.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-2">
                    <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium text-gray-800 text-sm leading-relaxed">{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status Card */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Account Status</h3>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 shadow-sm">
                  <div className={`w-2 h-2 rounded-full ${user.isVerified ? 'bg-emerald-500' : 'bg-red-500'} mr-1.5`}></div>
                  <span className="font-medium">
                    {user.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                  {user.createdAt && (
                    <span className="ml-1.5 text-gray-500 text-xs">
                      Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Button - positioned at the bottom right (only visible in view mode) */}
        {!isEditing && (
          <button
            onClick={handleDeleteClick}
            className="absolute bottom-6 right-6 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 text-xs font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 ease-in-out transform hover:scale-105 z-10"
            aria-label="Delete user"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete
          </button>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-5 py-2 rounded-lg text-gray-700 border border-gray-300 bg-white hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModal;

// Keyframes for the animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);
