import React from "react";

interface VenueCardProps {
  venueName: string;
  address: string;
  image_url: string | null;
  capacity: number;
  createdAt: string | null;
}

const VenueCardTemplate: React.FC<VenueCardProps> = ({
  venueName,
  address,
  image_url,
  capacity,
  createdAt,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={image_url || "/fallback.jpg"} // Use fallback image
          alt={venueName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md shadow-sm">
          Capacity: {capacity}
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">{venueName}</h2>
        <p className="text-sm text-gray-600">{address}</p>
        <p className="text-xs text-gray-400">
          {createdAt
            ? `Added on: ${new Date(createdAt).toLocaleDateString()}`
            : "Date unavailable"}
        </p>
      </div>
    </div>
  );
};

export default VenueCardTemplate;
