import React, { useState, useEffect } from "react";
import { users } from "../user/user.data";
import { EventsData } from "../events/Events.data";

const CreateRSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    UserID: "",
    EventID: "",
    quantity: 1,
    basePrice: 0,
  });

  const [eventName, setEventName] = useState("");
  const [rsvpDate, setRsvpDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [paymentMade, setPaymentMade] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setRsvpDate(today);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "EventID") {
      const selectedEvent = EventsData.find(
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
    setStatus("Confirmed");
    alert("Payment successful. RSVP status updated to Confirmed.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRSVP = {
      ...formData,
      RSVPDate: rsvpDate,
      RSVPStatus: paymentMade ? "Confirmed" : "Pending",
    };

    console.log("RSVP Created:", newRSVP);

    // Reset form
    setFormData({
      UserID: "",
      EventID: "",
      quantity: 1,
      basePrice: 0,
    });
    setEventName("");
    setStatus("Pending");
    setPaymentMade(false);
  };

  const totalCost = formData.basePrice * formData.quantity;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Create New RSVP
      </h2>

      {/* User Select */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">User</label>
        <select
          name="UserID"
          value={formData.UserID}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.UserID} value={user.UserID}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Event Select */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Event</label>
        <select
          name="EventID"
          value={formData.EventID}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Event</option>
          {EventsData.map((event) => (
            <option key={event.EventID} value={event.EventID}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {formData.EventID && (
        <>
          {/* Quantity Counter */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Number of RSVPs
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={decrement}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg">{formData.quantity}</span>
              <button
                type="button"
                onClick={increment}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Summary Data */}
          <div className="text-gray-700">
            <span className="font-semibold">Total Amount:</span>{" "}
            <span>
              KES {totalCost.toLocaleString()} ({formData.quantity} x{" "}
              {formData.basePrice.toLocaleString()})
            </span>
          </div>

          <div className="text-gray-700">
            <span className="font-semibold">RSVP Date:</span>{" "}
            <span>{rsvpDate}</span>
          </div>

          <div className="text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            <span className={paymentMade ? "text-green-600" : "text-yellow-600"}>
              {status}
            </span>
          </div>

          {/* Buttons Footer */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit RSVP
            </button>

            <button
              type="button"
              onClick={handlePayment}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Make Payment
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default CreateRSVPForm;
