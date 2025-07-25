//src\components\events\EventModal.tsx
// 
import { useEffect } from "react";
import { motion } from "framer-motion";

const EventModal = ({
  closeModal,
  image_url,
  title,
  description,
  category,
  venueName,
  date,
  time,
  ticketsPrice,
  soldTickets,
  totalTickets,
}: any) => {
  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <motion.div
      className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black/50"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={closeModal} // Click outside closes modal
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent inner click from closing
        className="bg-white w-full max-w-3xl mt-20 rounded-xl shadow-lg relative overflow-hidden"
      >
        {/* Close X */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold z-50"
        >
          &times;
        </button>

        {/* Top Image Section */}
        <div className="relative">
          <img
            src={image_url}
            alt={title}
            className="w-full h-64 object-cover"
          />
          <button className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 z-40 shadow-md">
            RSVP
          </button>
        </div>

        {/* Scrollable Content Section */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[50vh]">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-700">{description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="block font-medium">Category</span>
              <span>{category}</span>
            </div>
            <div>
              <span className="block font-medium">Venue</span>
              <span>{venueName}</span>
            </div>
            <div>
              <span className="block font-medium">Date</span>
              <span>{new Date(date).toDateString()}</span>
            </div>
            <div>
              <span className="block font-medium">Time</span>
              <span>{time}</span>
            </div>
            <div>
              <span className="block font-medium">Price</span>
              <span>KES {parseFloat(ticketsPrice).toLocaleString()}</span>
            </div>
            <div>
              <span className="block font-medium">Tickets</span>
              <span>{soldTickets}/{totalTickets} Sold</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventModal;
