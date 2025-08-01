// // src\components\events\CreateRSVPModal.tsx

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { 
//   useCreateRSVPMutation, 
//   useGetRSVPsByUserIdQuery,
//   type TRSVP 
// } from "../../reducers/RSVP/rsvpAPI";
// import type { RootState } from "../../app/store";

// interface CreateRSVPModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   eventId: number;
//   eventTitle: string;
//   ticketPrice: number;
//   availableTickets: number;
// }

// const CreateRSVPModal = ({ 
//   isOpen, 
//   onClose, 
//   eventId, 
//   eventTitle,
//   ticketPrice,
//   availableTickets 
// }: CreateRSVPModalProps) => {
//   const user = useSelector((state: RootState) => state.user.user);
//   const userId = user?.UserID;

//   // API hooks
//   const [createRSVP, { isLoading: isCreatingRSVP }] = useCreateRSVPMutation();
//   const { data: userRSVPsData, isLoading: loadingUserRSVPs } = useGetRSVPsByUserIdQuery(
//     userId || 0, 
//     { skip: !userId }
//   );

//   // State
//   const [quantity, setQuantity] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string>("");

//   // Auto-save draft key
//   const draftKey = `rsvp_draft_${eventId}_${userId}`;

//   // Check if user already has RSVPs for this event
//   const existingRSVPs = userRSVPsData?.data?.filter(
//     (rsvp: TRSVP) => rsvp.EventID === eventId && rsvp.RSVPStatus !== "Cancelled"
//   ) || [];
  
//   const hasExistingRSVP = existingRSVPs.length > 0;
//   const totalExistingTickets = existingRSVPs.length;

//   // Price calculations
//   const totalPrice = quantity * ticketPrice;

//   // Auto-save draft quantity
//   useEffect(() => {
//     if (isOpen && userId) {
//       const savedQuantity = localStorage.getItem(draftKey);
//       if (savedQuantity) {
//         const parsedQuantity = parseInt(savedQuantity);
//         if (parsedQuantity > 0 && parsedQuantity <= availableTickets) {
//           setQuantity(parsedQuantity);
//         }
//       }
//     }
//   }, [isOpen, userId, draftKey, availableTickets]);

//   // Save draft on quantity change
//   useEffect(() => {
//     if (isOpen && userId && quantity > 0) {
//       localStorage.setItem(draftKey, quantity.toString());
//     }
//   }, [quantity, isOpen, userId, draftKey]);

//   // Handle Escape key press
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && isOpen) {
//         handleClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   // Reset state when modal closes
//   useEffect(() => {
//     if (!isOpen) {
//       setError("");
//       setIsSubmitting(false);
//     }
//   }, [isOpen]);

//   const handleClose = () => {
//     onClose();
//   };

//   const handleQuantityChange = (delta: number) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1 && newQuantity <= availableTickets) {
//       setQuantity(newQuantity);
//       setError("");
//     }
//   };

//   const validateRSVP = () => {
//     if (!userId) {
//       setError("You must be logged in to make an RSVP");
//       return false;
//     }

//     if (quantity > availableTickets) {
//       setError(`Only ${availableTickets} tickets available`);
//       return false;
//     }

//     if (quantity <= 0) {
//       setError("Please select at least 1 ticket");
//       return false;
//     }

//     return true;
//   };

//   const createMultipleRSVPs = async (status: "Pending" | "Booked") => {
//     if (!userId) return;

//     const rsvpPromises = [];
    
//     // Create individual RSVP for each ticket
//     for (let i = 0; i < quantity; i++) {
//       const rsvpData = {
//         UserID: userId,
//         EventID: eventId,
//         RSVPStatus: status,
//         totalAmount: ticketPrice.toString(),
//         RSVPDate: new Date().toISOString().split('T')[0],
//       };
      
//       rsvpPromises.push(createRSVP(rsvpData).unwrap());
//     }

//     await Promise.all(rsvpPromises);
//   };

//   const handleSubmitRSVP = async () => {
//     if (!validateRSVP()) return;

//     setIsSubmitting(true);
//     setError("");

//     try {
//       await createMultipleRSVPs("Pending");
      
//       // Clear draft
//       localStorage.removeItem(draftKey);
      
//       // Close modal
//       handleClose();
      
//       // TODO: Show success notification
//       console.log(`${quantity} RSVP(s) created successfully with Pending status`);
      
//     } catch (error) {
//       console.error("Failed to create RSVP:", error);
//       setError("Failed to create RSVP. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleMakePayment = async () => {
//     if (!validateRSVP()) return;

//     setIsSubmitting(true);
//     setError("");

//     try {
//       await createMultipleRSVPs("Booked");
      
//       // Clear draft
//       localStorage.removeItem(draftKey);
      
//       // Close modal
//       handleClose();
      
//       // TODO: Redirect to thank you page
//       console.log(`${quantity} RSVP(s) created successfully with Booked status`);
      
//     } catch (error) {
//       console.error("Failed to process payment:", error);
//       setError("Failed to process payment. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <motion.div
//       className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={handleClose}
//     >
//       <motion.div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden"
//         initial={{ y: 50, opacity: 0, scale: 0.95 }}
//         animate={{ y: 0, opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white relative">
//           <button
//             onClick={handleClose}
//             className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 group"
//           >
//             <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
          
//           <h2 className="text-xl font-bold mb-1">RSVP for Event</h2>
//           <p className="text-blue-100 text-sm truncate">{eventTitle}</p>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* User RSVP History */}
//           {loadingUserRSVPs ? (
//             <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm text-gray-600">Checking your existing RSVPs...</p>
//             </div>
//           ) : hasExistingRSVP ? (
//             <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//               <div className="flex items-center gap-2 mb-1">
//                 <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//                 <span className="text-sm font-medium text-amber-800">Existing RSVP Found</span>
//               </div>
//               <p className="text-xs text-amber-700">
//                 You already have {totalExistingTickets} ticket{totalExistingTickets > 1 ? 's' : ''} for this event.
//               </p>
//             </div>
//           ) : null}

//           {/* Quantity Selector */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-3">
//               Number of Tickets
//             </label>
//             <div className="flex items-center justify-center gap-4">
//               <button
//                 onClick={() => handleQuantityChange(-1)}
//                 disabled={quantity <= 1}
//                 className="w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-full flex items-center justify-center transition-all duration-200 font-bold text-lg"
//               >
//                 −
//               </button>
              
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-gray-900 mb-1">{quantity}</div>
//                 <div className="text-xs text-gray-500">
//                   {quantity === 1 ? 'ticket' : 'tickets'}
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => handleQuantityChange(1)}
//                 disabled={quantity >= availableTickets}
//                 className="w-10 h-10 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-full flex items-center justify-center transition-all duration-200 font-bold text-lg text-blue-600"
//               >
//                 +
//               </button>
//             </div>
            
//             <div className="text-center mt-2">
//               <p className="text-xs text-gray-500">
//                 {availableTickets} tickets available
//               </p>
//             </div>
//           </div>

//           {/* Price Breakdown */}
//           <div className="mb-6 p-4 bg-gray-50 rounded-xl">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm text-gray-600">Price per ticket</span>
//               <span className="text-sm font-medium">KES {ticketPrice.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-sm text-gray-600">Quantity</span>
//               <span className="text-sm font-medium">× {quantity}</span>
//             </div>
//             <div className="border-t border-gray-200 pt-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-lg font-semibold text-gray-900">Total Amount</span>
//                 <div className="text-right">
//                   <div className="text-xl font-bold text-blue-600">
//                     KES {totalPrice.toLocaleString()}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     ({quantity} × KES {ticketPrice.toLocaleString()})
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-700 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="space-y-3">
//             {/* Submit RSVP Button */}
//             <button
//               onClick={handleSubmitRSVP}
//               disabled={isSubmitting || isCreatingRSVP || !userId}
//               className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Submitting RSVP...
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                   Submit RSVP (Pending)
//                 </>
//               )}
//             </button>

//             {/* Make Payment Button */}
//             <button
//               onClick={handleMakePayment}
//               disabled={isSubmitting || isCreatingRSVP || !userId}
//               className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105"
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Processing Payment...
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                   </svg>
//                   Make Payment (Book Now)
//                 </>
//               )}
//             </button>
//           </div>

//           {!userId && (
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Please log in to make an RSVP
//             </p>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CreateRSVPModal;

// src\components\events\CreateRSVPModal.tsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  useCreateRSVPMutation,
  useGetRSVPsByUserIdQuery,
  type TRSVP
} from "../../reducers/RSVP/rsvpAPI";
import type { RootState } from "../../app/store";
// import { useGetAllEventsQuery } from "../../reducers/Events/eventsAPI";

interface CreateRSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  eventTitle: string;
  ticketPrice: number;
  availableTickets: number;
  closeEventModal: () => void;
  reloadEvents: () => void;  
}
    // const {refetch: reloadEvents } = useGetAllEventsQuery();

const CreateRSVPModal = ({
  isOpen,
  onClose,
  closeEventModal,
  reloadEvents,
  eventId,
  eventTitle,
  ticketPrice,
  availableTickets,
}: CreateRSVPModalProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.UserID;
  

  var varAvailableTickets: number;
  // API hooks
  const [createRSVP, { isLoading: isCreatingRSVP }] = useCreateRSVPMutation();
  const { data: userRSVPsData, isLoading: loadingUserRSVPs } = useGetRSVPsByUserIdQuery(
    userId || 0,
    { skip: !userId }
  );

  // State
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string>("");

  // Auto-save draft key
  const draftKey = `rsvp_draft_${eventId}_${userId}`;

  // Check if user already has RSVPs for this event
  const existingRSVPs = userRSVPsData?.reservation?.filter(
    (rsvp: TRSVP) => rsvp.EventID === eventId && rsvp.RSVPStatus !== "Cancelled"
  ) || [];

  const hasExistingRSVP = existingRSVPs.length > 0;
  const totalExistingTickets = existingRSVPs.length;

  // Price calculations
  const totalPrice = quantity * ticketPrice;
  varAvailableTickets = availableTickets-quantity;

  // Auto-save draft quantity
  useEffect(() => {
    if (isOpen && userId) {
      const savedQuantity = localStorage.getItem(draftKey);
      if (savedQuantity) {
        const parsedQuantity = parseInt(savedQuantity);
        if (parsedQuantity > 0 && parsedQuantity <= availableTickets) {
          setQuantity(parsedQuantity);
        }
      }
    }
  }, [isOpen, userId, draftKey, availableTickets]);

  // Save draft on quantity change
  useEffect(() => {
    if (isOpen && userId && quantity > 0) {
      localStorage.setItem(draftKey, quantity.toString());
    }
  }, [quantity, isOpen, userId, draftKey]);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
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
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose(); // ✅ close RSVP modal
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= availableTickets) {
      setQuantity(newQuantity);
      setError("");
    }
  };

  const validateRSVP = () => {
    if (!userId) {
      setError("You must be logged in to make an RSVP");
      return false;
    }

    if (quantity > availableTickets) {
      setError(`Only ${availableTickets} tickets available`);
      return false;
    }

    if (quantity <= 0) {
      setError("Please select at least 1 ticket");
      return false;
    }

    return true;
  };

  const createMultipleRSVPs = async (status: "Pending" | "Booked") => {
    if (!userId) return;

    const rsvpPromises = [];

    // Create individual RSVP for each ticket
    for (let i = 0; i < quantity; i++) {
      const rsvpData = {
        UserID: userId,
        EventID: eventId,
        RSVPStatus: status,
        totalAmount: ticketPrice.toString(),
        RSVPDate: new Date().toISOString().split('T')[0],
      };

      // --- ADD THIS CONSOLE.LOG ---
      console.log('Sending RSVP data to backend:', rsvpData);
      // --- END ADDITION ---

      rsvpPromises.push(createRSVP(rsvpData).unwrap());
    }

    await Promise.all(rsvpPromises);
  };

  const handleSubmitRSVP = async () => {
    if (!validateRSVP()) return;

    setIsSubmitting(true);
    setError("");

    try {
      await createMultipleRSVPs("Pending");

      // Clear draft
      localStorage.removeItem(draftKey);

      // Close modal
      handleClose();
      closeEventModal(); // ✅ close Event modal
      await reloadEvents() ;

      // TODO: Show success notification
      console.log(`${quantity} RSVP(s) created successfully with Pending status`);

    } catch (error) {
      console.error("Failed to create RSVP:", error);
      setError("Failed to create RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakePayment = async () => {
    if (!validateRSVP()) return;

    setIsPaying(true)
    setError("");

    try {
      await createMultipleRSVPs("Booked");

      // Clear draft
      localStorage.removeItem(draftKey);

      // Close modal
      handleClose();
      closeEventModal(); // ✅ close Event modal
      await reloadEvents() ;

      // TODO: Redirect to thank you page
      console.log(`${quantity} RSVP(s) created successfully with Booked status`);

    } catch (error) {
      console.error("Failed to process payment:", error);
      setError("Failed to process payment. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-xl font-bold mb-1">RSVP for Event</h2>
          <p className="text-blue-100 text-sm truncate">{eventTitle}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User RSVP History */}
          {loadingUserRSVPs ? (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Checking your existing RSVPs...</p>
            </div>
          ) : hasExistingRSVP ? (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm font-medium text-amber-800">Existing RSVP Found</span>
              </div>
              <p className="text-xs text-amber-700">
                You already have {totalExistingTickets} ticket{totalExistingTickets > 1 ? 's' : ''} for this event.
              </p>
            </div>
          ) : null}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Number of Tickets
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-full flex items-center justify-center transition-all duration-200 font-bold text-lg"
              >
                −
              </button>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{quantity}</div>
                <div className="text-xs text-gray-500">
                  {quantity === 1 ? 'ticket' : 'tickets'}
                </div>
              </div>

              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= availableTickets}
                className="w-10 h-10 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-full flex items-center justify-center transition-all duration-200 font-bold text-lg text-blue-600"
              >
                +
              </button>
            </div>

            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">
                {varAvailableTickets} tickets available
              </p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Price per ticket</span>
              <span className="text-sm font-medium">KES {ticketPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">Quantity</span>
              <span className="text-sm font-medium">× {quantity}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    KES {totalPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    ({quantity} × KES {ticketPrice.toLocaleString()})
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Submit RSVP Button */}
            <button
              onClick={handleSubmitRSVP}
              disabled={isSubmitting || isCreatingRSVP || !userId}
              className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting || isPaying ?  (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting RSVP...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Submit RSVP (Pending)
                </>
              )}
            </button>

            {/* Make Payment Button */}
            <button
              onClick={handleMakePayment}
              disabled={isSubmitting || isCreatingRSVP || isPaying || !userId}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105"
            >
              {isPaying ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Payment...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Make Payment (Book Now)
                </>
              )}
            </button>
          </div>

          {!userId && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please log in to make an RSVP
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateRSVPModal;