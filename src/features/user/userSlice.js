import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/auth";

const userSlice = createSlice({
	name: "auth",
	initialState: { user: null, token: null },
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				state.user = payload.user;
			}
		);
	},
});

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
