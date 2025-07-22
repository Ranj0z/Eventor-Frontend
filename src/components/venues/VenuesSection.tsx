// venues/VenuesSection.tsx
import React from "react";
import { VenuesData } from "./VenuesData";
import VenueCardTemplate from "./VenueCardTemplate";

const VenuesSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Available Venues</h1>
        <p className="text-gray-600 text-lg mt-2">
          Explore our event venues and their details.
        </p>
      </div>

      {VenuesData.length === 0 ? (
        <p className="text-center text-gray-500">No venues available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {VenuesData.map((venue) => (
            <VenueCardTemplate
              key={venue.VenueID}
              venueName={venue.venueName}
              address={venue.address}
              image_url={venue.image_url}
              capacity={venue.capacity}
              createdAt={venue.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuesSection;
