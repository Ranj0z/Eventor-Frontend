import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EventCardProps = {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  ticketsPrice: string;
  totalTickets: number;
  soldTickets: number;
  image_url: string;
  venueName: string;
};

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  category,
  date,
  time,
  ticketsPrice,
  totalTickets,
  soldTickets,
  image_url,
  venueName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableTickets = totalTickets - soldTickets;
  const almostFull = availableTickets < totalTickets * 0.2;

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Event Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-md mx-auto h-[32rem] flex flex-col"
      >
        <img
          src={image_url}
          alt={title}
          className="w-full h-[40%] object-cover"
        />

        <div className="p-3 flex flex-col justify-between flex-grow space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
              {category}
            </span>
            <span className="text-gray-500">{venueName}</span>
          </div>

          <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
            {title}
          </h2>

          <div className="flex justify-between text-xs text-gray-600">
            <div>
              <span className="block font-medium">Date:</span>
              <span>{new Date(date).toDateString()}</span>
            </div>
            <div>
              <span className="block font-medium">Time:</span>
              <span>{time}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-700">
              KES {parseFloat(ticketsPrice).toLocaleString()}
            </span>
            <span
              className={`font-medium ${
                almostFull ? "text-red-600" : "text-green-600"
              }`}
            >
              {soldTickets}/{totalTickets} Sold
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-1 bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            View Details
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm mt-20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal Container */}
            <motion.div
              className="fixed z-50 mt-20 inset-0 flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-3xl rounded-xl shadow-lg relative overflow-hidden"
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
                  <button
                    className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 z-40 shadow-md"
                  >
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
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventCard;
