// src/components/venues/VenuesSection.tsx

import React from "react";
import VenueCardTemplate from "./VenueCardTemplate";
import { useGetAllVenuesQuery } from "../../reducers/Venues/venuesAPI";

const VenuesSection: React.FC = () => {
  const { data, isLoading, isError } = useGetAllVenuesQuery();

  const venues = data?.Venues ?? []; // fallback to empty array

  return (
    <div className="min-h-[70vh]  overflow-y-auto bg-gray-50 px-6 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Available Venues
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg mt-2">
          Explore our event venues and their details.
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading venues...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load venues.</p>
      ) : venues.length === 0 ? (
        <p className="text-center text-gray-500">No venues available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pr-1">
          {venues.map((venue) => (
            <VenueCardTemplate
              key={venue.VenueID}
              venueName={venue.venueName}
              address={venue.address}
              image_url={venue.image_url || "https://res.cloudinary.com/dzysb2qhd/image/upload/v1753007171/samples/man-on-a-escalator.jpg"}
              capacity={venue.capacity}
              createdAt={venue.createdAt || ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuesSection;
