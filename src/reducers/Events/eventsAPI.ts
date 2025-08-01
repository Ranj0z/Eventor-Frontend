import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

//Events Table
export type TEvents = {
  EventID: number;
  title: string;
  description: string;
  VenueID: number;
  category: string;
  date: string;
  time: string;
  ticketsPrice: number;
  totalTickets: number;
  soldTickets: number;
  image_url: string;
  createdAt: string;
  updatedAt: string;
};

export const eventsAPI = createApi({
  reducerPath: "eventsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    // POST: Create New Event
    createEvent: builder.mutation<{ data: TEvents }, Partial<TEvents>>({
      query: (newEvent) => ({
        url: "/event/newevent",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Events"],
    }),

    // GET: All Events
    getAllEvents: builder.query<{ Events: TEvents[] }, void>({
      query: () => "/event/allevents",
      providesTags: ["Events"],
    }),

    // GET: Event by ID
    getEventById: builder.query<{ data: TEvents }, number>({
      query: (id) => `/event/${id}`,
    }),

    // GET: Events by Venue ID
    getEventsByVenueId: builder.query<{ data: TEvents[] }, number>({
      query: (venueId) => `/event/venue/${venueId}`,
    }),

    // ✅ GET: Events by User ID (new)
    getEventsByUserId: builder.query<{ data: TEvents[] }, number>({
      query: (userId) => `/event/user/${userId}`,
    }),

    // PATCH: Update Event by ID
    updateEvent: builder.mutation<TEvents, Partial<TEvents> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `/event/update/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Events"],
    }),

    // DELETE: Event by ID (✅ fixed route)
    deleteEvent: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/event/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useGetEventsByVenueIdQuery,
  useGetEventsByUserIdQuery, // ✅ export new hook
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsAPI;
