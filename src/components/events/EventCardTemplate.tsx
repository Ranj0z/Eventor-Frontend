// src/components/events/EventCardTemplate.tsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import EventModal from "./EventModal";
import CreateRSVPModal from "./CreateRSVPModal";

interface EventCardProps  {
  EventID: number;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  ticketsPrice: number;
  totalTickets: number;
  soldTickets: number;
  image_url: string;
  venueName: string;
  reloadEvents: ()=> void;
};

const EventCard: React.FC<EventCardProps> = (event) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const availableTickets = event.totalTickets - event.soldTickets;
  const almostFull = availableTickets < event.totalTickets * 0.2;

  const closeEventModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-md mx-auto flex flex-col"
      >
        {/* Hero Image Section with RSVP Button */}
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Category Badge - Top Right */}
          <div className="absolute top-3 right-3">
            <span className="bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
              {event.category}
            </span>
          </div>

          {/* RSVP Button - Bottom Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsRSVPModalOpen(true);
            }}
            disabled={availableTickets <= 0}
            hidden ={availableTickets <= 0}
            className="absolute bottom-3 left-3 px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-500 disabled:to-gray-600 text-white text-sm font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex items-center gap-2 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {availableTickets <= 0 ? 'Sold Out' : 'RSVP'}
          </button>

          {/* Availability Indicator - Bottom Right */}
          {availableTickets <= 5 && availableTickets > 0 && (
            <div className="absolute bottom-3 right-3">
              <span className="px-2 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full animate-pulse">
                Only {availableTickets} left!
              </span>
            </div>
          )}

          {/* Sold Out Overlay */}
          {availableTickets <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          {/* Header Info */}
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-gray-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.venueName}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2 mb-3 min-h-[3.5rem]">
            {event.title}
          </h2>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="font-medium">Date</div>
                <div className="text-xs">{new Date(event.date).toDateString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="font-medium">Time</div>
                <div className="text-xs">{event.time}</div>
              </div>
            </div>
          </div>

          {/* Price and Availability */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="font-bold text-lg text-gray-800">
                KES {Number(event.ticketsPrice).toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className={`font-medium text-sm ${
                almostFull ? "text-red-600" : "text-green-600"
              }`}>
                {availableTickets > 0 ? `${availableTickets} available` : 'Sold out'}
              </span>
              <div className="text-xs text-gray-500">
                {event.soldTickets}/{event.totalTickets} sold
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  (event.soldTickets / event.totalTickets) > 0.8 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  (event.soldTickets / event.totalTickets) > 0.6 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                  'bg-gradient-to-r from-green-500 to-green-600'
                }`}
                style={{ width: `${(event.soldTickets / event.totalTickets) * 100}%` }}
              />
            </div>
          </div>

          {/* View Details Button */}
          {availableTickets <= 0 &&
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white text-sm font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>}
          <button
            onClick={() => {setIsModalOpen(true)}}
            hidden = {availableTickets <= 0}
            className="w-full mt-1 bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            View Details
          </button>
        </div>
      </motion.div>

      {/* Event Modal */}
      {isModalOpen && (
        <EventModal
          closeModal={closeEventModal}
          {...event}
          reloadEvents={event.reloadEvents}
        />
      )}

      {/* RSVP Modal */}
      {isRSVPModalOpen && (
        <CreateRSVPModal
          isOpen={isRSVPModalOpen}
          onClose={() => setIsRSVPModalOpen(false)}
          closeEventModal={closeEventModal}
          eventId={event.EventID}
          eventTitle={event.title}
          ticketPrice={event.ticketsPrice}
          availableTickets={availableTickets}
          reloadEvents={event.reloadEvents}
        />
      )}
    </>
  );
};

export default EventCard;