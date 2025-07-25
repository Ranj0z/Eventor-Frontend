import React, { useState } from "react";
import { motion } from "framer-motion";
import EventModal from "./EventModal";

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

const EventCard: React.FC<EventCardProps> = (event) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableTickets = event.totalTickets - event.soldTickets;
  const almostFull = availableTickets < event.totalTickets * 0.2;

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-md gap-y-0 overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-md mx-auto my- flex flex-col"

      >
        <img src={event.image_url} alt={event.title} className="w-full h-[40%] object-cover" />

        <div className="p-3 flex flex-col justify-between flex-grow gap-y-0">
          <div className="flex justify-between items-center text-xs">
            <span className="bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
              {event.category}
            </span>
            <span className="text-gray-500">{event.venueName}</span>
          </div>

          <h2 className="text-base font-semibold text-gray-800 line-clamp-1">{event.title}</h2>

          <div className="flex justify-between text-xs text-gray-600">
            <div>
              <span className="block font-medium">Date:</span>
              <span>{new Date(event.date).toDateString()}</span>
            </div>
            <div>
              <span className="block font-medium">Time:</span>
              <span>{event.time}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-700">
              KES {parseFloat(event.ticketsPrice).toLocaleString()}
            </span>
            <span className={`font-medium ${almostFull ? "text-red-600" : "text-green-600"}`}>
              {event.soldTickets}/{event.totalTickets} Sold
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
      {isModalOpen && (
        <EventModal
          closeModal={closeModal}
          {...event}
        />
      )}
    </>
  );
};

export default EventCard;
