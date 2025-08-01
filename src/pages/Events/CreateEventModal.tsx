import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCreateEventMutation } from "../../reducers/Events/eventsAPI";
import { useGetAllVenuesQuery } from "../../reducers/Venues/venuesAPI";
import type { TEvents } from "../../reducers/Events/eventsAPI";
import type { TVenue } from "../../reducers/Venues/venuesAPI";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: (event: TEvents) => void;
  reloadEvents: () => void;
}

const CreateEventModal = ({ isOpen, onClose, onEventCreated }: CreateEventModalProps) => {
  const [createEvent, { isLoading: isCreating, error: createError }] = useCreateEventMutation();
  const { data: venuesData, isLoading: venuesLoading } = useGetAllVenuesQuery();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    VenueID: "",
    category: "Tech",
    date: "",
    time: "",
    ticketsPrice: "",
    totalTickets: "",
    soldTickets: "0",
    image_url: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Tech", "Data Science", "Web Dev"];

  // Handle Escape key press
  useEffect(() => {
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
  }, [onClose, isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        description: "",
        VenueID: "",
        category: "Tech",
        date: "",
        time: "",
        ticketsPrice: "",
        totalTickets: "",
        soldTickets: "0",
        image_url: "",
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.length > 50) newErrors.title = "Title must be 50 characters or less";
    
    if (!formData.description.trim()) newErrors.description = "Description is required";
    
    if (!formData.VenueID) newErrors.VenueID = "Please select a venue";
    
    if (!formData.date) newErrors.date = "Date is required";
    else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) newErrors.date = "Event date cannot be in the past";
    }
    
    if (!formData.time) newErrors.time = "Time is required";
    
    if (!formData.ticketsPrice) newErrors.ticketsPrice = "Ticket price is required";
    else if (parseFloat(formData.ticketsPrice) < 0) newErrors.ticketsPrice = "Price must be positive";
    
    if (!formData.totalTickets) newErrors.totalTickets = "Total tickets is required";
    else if (parseInt(formData.totalTickets) <= 0) newErrors.totalTickets = "Must have at least 1 ticket";
    
    // if (!formData.image_url.trim()) newErrors.image_url = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const eventData = {
        ...formData,
        VenueID: parseInt(formData.VenueID),
        ticketsPrice: parseFloat(formData.ticketsPrice),
        totalTickets: parseInt(formData.totalTickets),
        soldTickets: parseInt(formData.soldTickets),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };

      const result = await createEvent(eventData).unwrap();
      
      if (onEventCreated && result.data) {
        onEventCreated(result.data);
      }
      
      onClose();
    } catch (error) {
      console.error("Failed to create event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl relative overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-2xl font-bold mb-2">Create New Event</h2>
          <p className="text-blue-100">Fill in the details to create your event</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter event title (max 50 characters)"
                maxLength={50}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              <p className="text-gray-500 text-xs mt-1">{formData.title.length}/50 characters</p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                  errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Describe your event..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Venue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Venue *
              </label>
              <select
                name="VenueID"
                value={formData.VenueID}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.VenueID ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                disabled={venuesLoading}
              >
                <option value="">Select a venue</option>
                {venuesData?.Venues?.map((venue: TVenue) => (
                  <option key={venue.VenueID} value={venue.VenueID}>
                    {venue.venueName} - {venue.address} (Capacity: {venue.capacity})
                  </option>
                ))}
              </select>
              {errors.VenueID && <p className="text-red-500 text-sm mt-1">{errors.VenueID}</p>}
              {venuesLoading && <p className="text-gray-500 text-sm mt-1">Loading venues...</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.time ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>

            {/* Ticket Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ticket Price (KES) *
              </label>
              <input
                type="number"
                name="ticketsPrice"
                value={formData.ticketsPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.ticketsPrice ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="0.00"
              />
              {errors.ticketsPrice && <p className="text-red-500 text-sm mt-1">{errors.ticketsPrice}</p>}
            </div>

            {/* Total Tickets */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Tickets *
              </label>
              <input
                type="number"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.totalTickets ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="100"
              />
              {errors.totalTickets && <p className="text-red-500 text-sm mt-1">{errors.totalTickets}</p>}
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Image URL *
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.image_url ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="https://example.com/event-image.jpg"
              />
              {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
            </div>
          </div>

          {/* Error Display */}
          {createError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">
                Failed to create event. Please try again.
              </p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isCreating}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting || isCreating ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateEventModal;