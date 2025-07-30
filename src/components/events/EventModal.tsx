// src\components\events\EventModal.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import CreateRSVPModal from "./CreateRSVPModal";

const EventModal: React.FC = ({
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
  EventID,
}: any) => {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  // Calculate available tickets
  const availableTickets = totalTickets - soldTickets;
  const ticketPercentage = (soldTickets / totalTickets) * 100;

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
    <>
      <motion.div
        className="fixed z-40 inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={closeModal}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 z-50 shadow-lg hover:shadow-xl group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Hero Image Section */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img
              src={image_url}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                {category}
              </span>
            </div>

            {/* RSVP Button */}
            <button
              onClick={() => setIsRSVPModalOpen(true)}
              disabled={availableTickets <= 0}
              className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-500 disabled:to-gray-600 text-white text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex items-center gap-2 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {availableTickets <= 0 ? 'Sold Out' : 'RSVP'}
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
            {/* Title and Description */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">{title}</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
            </div>

            {/* Event Details - Compact Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm mb-6">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-gray-500">Venue</span>
                </div>
                <span className="text-gray-900 font-medium text-xs sm:text-sm">{venueName}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-500">Date</span>
                </div>
                <span className="text-gray-900 font-medium text-xs sm:text-sm block">{new Date(date).toDateString()}</span>
                <span className="text-gray-600 text-xs">{time}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-medium text-gray-500">Price</span>
                </div>
                <span className="text-gray-900 font-bold text-sm sm:text-base">KES {parseFloat(ticketsPrice).toLocaleString()}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span className="font-medium text-gray-500">Available</span>
                </div>
                <span className={`font-bold text-sm sm:text-base ${
                  availableTickets > 0 ? 'text-green-700' : 'text-red-700'
                }`}>
                  {availableTickets} left
                </span>
              </div>
            </div>

            {/* Compact Ticket Availability */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">Tickets Sold</span>
                <span className="text-xs text-gray-600">{soldTickets}/{totalTickets}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    ticketPercentage > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    ticketPercentage > 60 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    'bg-gradient-to-r from-green-500 to-green-600'
                  }`}
                  style={{ width: `${ticketPercentage}%` }}
                />
              </div>
              
              <div className="text-center">
                <span className="text-xs text-gray-600">{Math.round(ticketPercentage)}% sold</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* RSVP Modal */}
      <CreateRSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        eventId={EventID}
        eventTitle={title}
        ticketPrice={parseFloat(ticketsPrice)}
        availableTickets={availableTickets}
      />
    </>
  );
};

export default EventModal;