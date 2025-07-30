// src\reducers\Login\loginAPI.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

export type TLoginResponse = {
    token: string;
    user: {
        UserID: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        address: string;
        role: "admin" | "host" | "user";
        isVerified: boolean;
        image_url: string;
        verificationCode?: string;
        createdAt?: string;
        updatedAt?: string;
    };
}

type LoginInputs = {
    email: string;
    password: string;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
    tagTypes: ['Login'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<TLoginResponse, LoginInputs>({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData
            }),
            invalidatesTags: ['Login']
        })
    })
});