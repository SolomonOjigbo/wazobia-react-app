import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "https://test-api.sytbuilder.com/",
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = getState().auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "me",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useLoginMutation } = api;
