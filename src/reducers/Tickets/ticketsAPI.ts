import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

export type TicketStatus = "Pending" | "In Progress" | "Closed";

export type TTicket = {
  TicketID: number;
  UserID: number;
  subject: string;
  description: string;
  ticketStatus: TicketStatus;
  created_at: string;
  updated_at?: string;
};

export const ticketsAPI = createApi({
  reducerPath: "ticketsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({
    // POST /ticket/newTicket
    createTicket: builder.mutation<TTicket, Partial<TTicket>>({
      query: (newTicket) => ({
        url: "/ticket/newTicket",
        method: "POST",
        body: newTicket,
      }),
      invalidatesTags: ["Tickets"],
    }),

    // GET /ticket/allTickets
    getTickets: builder.query<{ message: string; Tickets: TTicket[] }, void>({
      query: () => "/ticket/allTickets",
      providesTags: ["Tickets"],
    }),

    // GET /ticket/:id
    getTicketById: builder.query<{ message: string; Tickets: TTicket }, number>({
      query: (id) => `/ticket/${id}`,
      providesTags: ["Tickets"],
    }),

    // GET /ticket/user/:id
    getTicketsByUserId: builder.query<{ message: string; Tickets: TTicket[] }, number>({
      query: (userId) => `/ticket/user/${userId}`,
      providesTags: ["Tickets"],
    }),

    // PATCH /ticket/updateticket/:id
    updateTicket: builder.mutation<TTicket, Partial<TTicket> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `/ticket/updateticket/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Tickets"],
    }),

    // For status updates - using the same update endpoint
    updateTicketStatus: builder.mutation<{ message: string }, { id: number; status: TicketStatus }>({
      query: ({ id, status }) => ({
        url: `/ticket/updateticket/${id}`,
        method: "PATCH",
        body: { ticketStatus: status },
      }),
      invalidatesTags: ["Tickets"],
    }),

    // DELETE /ticket/delete/:id
    deleteTicket: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/ticket/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useGetTicketsByUserIdQuery,
  useUpdateTicketMutation,
  useUpdateTicketStatusMutation,
  useDeleteTicketMutation,
} = ticketsAPI;