import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";


export type TVenue = {
    VenueID: number;
    venueName: string;
    address: string;
    image_url: string | null;
    capacity: number;
    createdAt: string | null;
}

export const venuesAPI = createApi({
  reducerPath: "venuesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).user.token;
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Prescriptions"],
  endpoints: (builder) => ({
    // POST New Venue
    createVenue: builder.mutation<TVenue, Partial<TVenue>>({
      query: (newVenue) => ({
        url: "/venue/newVenue",
        method: "POST",
        body: newVenue,
      }),
      invalidatesTags: ["Prescriptions"],
    }),

    // GET all Venues
    getAllVenues: builder.query<{ Venues: TVenue[] }, void>({
      query: () => "/venue/allVenues",
      providesTags: ["Prescriptions"],
    }),

    // GET Venue by ID
    getVenueById: builder.query<{ data: TVenue }, number>({
      query: (id) => `/venue/${id}`,
    }),

    // PATCH Update Venue by id
    updateVenue: builder.mutation<TVenue, Partial<TVenue> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `/venue/update/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Prescriptions"],
    }),

    // DELETE Venue by ID
    deleteVenue: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/Venue/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescriptions"],
    }),
  }),
});

export const {
  useCreateVenueMutation,
  useGetVenueByIdQuery,
  useGetAllVenuesQuery, // 👈 Add this
  useUpdateVenueMutation,
  useDeleteVenueMutation,
} = venuesAPI;
