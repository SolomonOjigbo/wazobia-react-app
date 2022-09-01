import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://test-api.sytbuilder.com/" }),
	tagTypes: ["Items", "User"],
	endpoints: (builder) => ({
		getItems: builder.query({
			query: () => "/items",
			providesTags: ["Items"],
		}),
		addItem: builder.mutation({
			query: (todo) => ({
				url: "/items",
				method: "POST",
				body: todo,
			}),
			invalidatesTags: ["Items"],
		}),
		updateItem: builder.mutation({
			query: (item) => ({
				url: `/items/${todo.id}`,
				method: "PATCH",
				body: todo,
			}),
			invalidatesTags: ["Items"],
		}),
		deleteItem: builder.mutation({
			query: ({ id }) => ({
				url: `/items/${id}`,
				method: "DELETE",
				body: id,
			}),
			invalidatesTags: ["Items"],
		}),
	}),
});
