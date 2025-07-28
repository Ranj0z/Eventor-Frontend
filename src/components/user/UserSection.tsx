import React, { useState } from "react";
import UserCardTemplate from "./UserCardTemplate";
import { users } from "./user.data";
// import CreateUserForm from "./CreateUserForm";

const UserSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-h-[70vh]  overflow-y-auto bg-gray-900 w-full flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gray-900 z-10 px-4 py-4 flex justify-between items-center border-b border-gray-700 shrink-0">
        <h1 className="text-2xl font-semibold text-white">User Summary</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
        >
          Create New User
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
          "
        >
          {users.map((user) => (
            <UserCardTemplate key={user.UserID} user={{
                ...user,
                role: user.role.toLowerCase() as "admin" | "host" | "user"
            }} />
          ))}
        </div>
      </div>

      {/* Modal: Create User Form */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            {/* <CreateUserForm /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSection;
