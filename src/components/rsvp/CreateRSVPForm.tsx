// src/components/rsvp/CreateRSVPForm.tsx

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCreateRSVPMutation, type TRSVP } from "../../reducers/RSVP/rsvpAPI";
import { useGetAllEventsQuery } from "../../reducers/Events/eventsAPI";
import type { RootState } from "../../app/store";

interface CreateRSVPFormProps {
  isOpen: boolean;
  onClose: () => void;
  onRSVPCreated?: (rsvp: TRSVP) => void;
  defaultUserID?: number;
  defaultEventID?: number;
}

const CreateRSVPForm = ({ 
  isOpen, 
  onClose, 
  onRSVPCreated, 
  defaultUserID, 
  defaultEventID 
}: CreateRSVPFormProps) => {
  const [createRSVP] = useCreateRSVPMutation();
  
  // Get current user from Redux store
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.UserID || defaultUserID;
  const userName = user ? `${user.firstName} ${user.lastName}` : "Unknown User";

  // Fetch events data
  const { 
    data: eventsData, 
    isLoading: eventsLoading, 
    error: eventsError 
  } = useGetAllEventsQuery();

  const [formData, setFormData] = useState({
    EventID: defaultEventID?.toString() || "",
    quantity: 1,
    basePrice: 0,
  });

  const [eventName, setEventName] = useState("");
  const [rsvpDate, setRsvpDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [paymentMade, setPaymentMade] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setRsvpDate(today);

    if (defaultEventID) {
      const selectedEvent = eventsData?.Events?.find(
        (event) => event.EventID === defaultEventID
      );
      if (selectedEvent) {
        setFormData((prev) => ({
          ...prev,
          EventID: defaultEventID.toString(),
          basePrice: Number(selectedEvent.ticketsPrice),
        }));
        setEventName(selectedEvent.title);
      }
    }

    // Escape key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, isOpen, defaultEventID, eventsData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "EventID") {
      const selectedEvent = eventsData?.Events?.find(
        (event) => event.EventID.toString() === value
      );
      const price = selectedEvent ? Number(selectedEvent.ticketsPrice) : 0;
      const title = selectedEvent ? selectedEvent.title : "";

      setFormData((prev) => ({
        ...prev,
        EventID: value,
        basePrice: price,
      }));

      setEventName(title);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setPaymentMade(false);
    setStatus("Pending");
  };

  const increment = () => {
    setFormData((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decrement = () => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };

  const handlePayment = () => {
    setPaymentMade(true);
    setStatus("Booked");
    // You can replace this with actual payment processing
    alert("Payment successful. RSVP status updated to Booked.");
  };
  
  const totalCost = formData.basePrice * formData.quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("Please log in to create an RSVP");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const rsvpData = {
        UserID: userId,
        EventID: parseInt(formData.EventID),
        quantity: formData.quantity,
        totalAmount: totalCost.toString(),
        RSVPStatus: (paymentMade ? "Booked" : "Pending") as "Pending" | "Booked" | "Cancelled",
        RSVPDate: rsvpDate,
      };

      console.log("Creating RSVP with data:", rsvpData);

      const result = await createRSVP(rsvpData).unwrap();
      console.log("✅ RSVP created successfully:", result);
      
      if (onRSVPCreated && result.data) {
        onRSVPCreated(result.data);
      }
      
      // Reset form
      setFormData({
        EventID: "",
        quantity: 1,
        basePrice: 0,
      });
      setEventName("");
      setPaymentMade(false);
      setStatus("Pending");
      
      onClose();
    } catch (error) {
      console.error("Failed to create RSVP:", error);
      alert("Failed to create RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Loading state for events
  if (eventsLoading) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-lg text-gray-700">Loading events...</div>
        </div>
      </div>
    );
  }

  // Error state for events
  if (eventsError) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-lg text-red-600 mb-4">Error loading events</div>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-800">Create New RSVP</h2>
          <button
            className="text-gray-400 hover:text-red-600 text-2xl font-bold transition-colors"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* User Info (Read-only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">User</label>
            <div className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600">
              {userName} (ID: {userId})
            </div>
            <p className="text-xs text-gray-500 mt-1">
              User is automatically set from your logged-in account
            </p>
          </div>

          {/* Event Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Event *</label>
            <select
              name="EventID"
              value={formData.EventID}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Event</option>
              {eventsData?.Events?.map((event) => (
                <option key={event.EventID} value={event.EventID}>
                  {event.title} - KES {Number(event.ticketsPrice).toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {formData.EventID && (
            <>
              {/* Quantity Counter */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Number of Tickets
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={decrement}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold min-w-[2rem] text-center">
                    {formData.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={increment}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Summary Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-gray-800 mb-3">RSVP Summary</h3>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Event:</span>
                  <span className="font-medium">{eventName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per ticket:</span>
                  <span>KES {formData.basePrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span>{formData.quantity}</span>
                </div>
                
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-purple-600">KES {totalCost.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">RSVP Date:</span>
                  <span>{rsvpDate}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    paymentMade ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {isSubmitting ? "Creating RSVP..." : "Create RSVP"}
                </button>

                {!paymentMade && totalCost > 0 && (
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Pay Now (KES {totalCost.toLocaleString()})
                  </button>
                )}
              </div>

              {totalCost === 0 && (
                <div className="text-center text-green-600 bg-green-50 p-3 rounded-lg">
                  🎉 This is a free event!
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateRSVPForm;