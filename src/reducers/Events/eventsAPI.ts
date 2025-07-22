import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

//Events Table
export type TEvents = {
    EventID: number;
    title: string;
    description: string;
    VenueID: number;
    category: number;
    date: string;
    time: string;
    ticketsPrice:number;
    totalTickets: number;
    soldTickets: number;
    createdAt: string;
    updatedAt: string;
};

export const eventsAPI = createApi({
  reducerPath: "eventsAPI",
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
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    // POST New Event
    createEvent: builder.mutation<{ data: TEvents }, Partial<TEvents>>({
      query: (newEvent) => ({
        url: "/event/newevent",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Events"],
    }),

    // GET All Events
    getAllEvents: builder.query<{ data: TEvents[] }, void>({
      query: () => "/event/allevents",
      providesTags: ["Events"],
    }),

    // GET Event by ID
    getEventById: builder.query<{ data: TEvents }, number>({
      query: (id) => `/event/${id}`,
    }),

    // GET /appointments/user/:userId
    getEventsByVenueId: builder.query<{ data: TEvents[] }, number>({
      query: (userId) => `/event/venue/${userId}`,
    }),

  
    // PATCH Update Event by ID
    updateEvent: builder.mutation<TEvents, Partial<TEvents> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `/event/update/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Events"],
    }),


    // DELETE /appointment/:id
    deleteEvent: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  
  // useCreateAppointmentMutation,
  // useGetAppointmentsQuery,
  // useGetDetailedAppointmentsQuery,
  // useGetAppointmentByIdQuery,
  // useGetAppointmentsByUserIdQuery,
  // useGetAppointmentsByDoctorIdQuery,
  // useGetAppointmentsByStatusQuery,
  // useUpdateAppointmentMutation,
  // useUpdateAppointmentStatusMutation,
  // useDeleteAppointmentMutation,
} = eventsAPI;
