// src\reducers\RSVP\rsvpAPI.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiDomain } from '../../utils/ApiDomain';
import type { RootState } from '../../app/store';

// Type definition
export type TRSVP = {
  RSVPID: number;
  UserID: number;
  EventID: number;
  RSVPStatus: "Pending" | "Booked" | "Cancelled";
  quantity: number;
  totalAmount: string;
  RSVPDate: string;
};

export const rsvpAPI = createApi({
  reducerPath: 'rsvpAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).user.token;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['RSVP'],
  endpoints: (builder) => ({
    // Create new RSVP
    createRSVP: builder.mutation<{ data: TRSVP }, Partial<TRSVP>>({
      query: (newRSVP) => ({
        url: '/reservation/newRsvp',
        method: 'POST',
        body: newRSVP,
      }),
      invalidatesTags: ['RSVP'],
    }),

    // Get all RSVPs
    getAllRSVPs: builder.query<{ reservations: TRSVP[] }, void>({
      query: () => '/reservation/allRsvps',
      providesTags: ['RSVP'],
    }),

    // Get RSVP by ID
    getRSVPById: builder.query<{ data: TRSVP }, number>({
      query: (id) => `/reservation/${id}`,
    }),

    // Get RSVPs by EventID
    getRSVPsByEventId: builder.query<{ data: TRSVP[] }, number>({
      query: (eventId) => `/reservation/event/${eventId}`,
    }),

    // Get RSVPs by UserID
    getRSVPsByUserId: builder.query<{ data: TRSVP[] }, number>({
      query: (userId) => `/reservation/user/${userId}`,
    }),

    // Update RSVP by ID
    updateRSVP: builder.mutation<TRSVP, Partial<TRSVP> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `/reservation/update/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: ['RSVP'],
    }),

    // Delete RSVP by ID
    deleteRSVP: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/reservation/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RSVP'],
    }),
  }),
});

// Export hooks
export const {
  useCreateRSVPMutation,
  useGetAllRSVPsQuery,
  useGetRSVPByIdQuery,
  useGetRSVPsByEventIdQuery,
  useGetRSVPsByUserIdQuery,
  useUpdateRSVPMutation,
  useDeleteRSVPMutation,
} = rsvpAPI;
