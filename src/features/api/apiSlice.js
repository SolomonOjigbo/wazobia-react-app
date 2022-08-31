import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api", // optional
	baseQuery: fetchBaseQuery({ baseUrl: "https://test-api.sytbuilder.com/" }),
	tagTypes: ["Event", "User"],
	endpoints: (builder) => ({}),
});
