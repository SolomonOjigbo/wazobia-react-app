import { createSlice } from "@reduxjs/toolkit";
import { login, signup, getUser } from "../api/auth";

const token = localStorage.getItem("token")
	? localStorage.getItem("token")
	: null;

const initialState = {
	loading: false,
	user: null,
	token: null,
	error: null,
	success: false,
};

const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("token"); // delete token from storage
			state.loading = false;
			state.user = null;
			state.token = null;
			state.error = null;
		},
	},
	extraReducers: {
		// login user
		[login.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[login.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.user = payload.user;
			state.token = payload.token;
		},
		[login.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
		},
		// register user
		[signup.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[signup.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.user = payload.user;
			state.token = payload.token;
		},
		[signup.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// get login user
		[getUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[getUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.user = payload.user;
			state.success = true;
		},
		[getUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.user = null;
		},
	},
});

export const { logout } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.user;

export default userSlice.reducer;
