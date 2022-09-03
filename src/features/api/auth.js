import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://test-api.sytbuilder.com/";

export const login = createAsyncThunk(
	"login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				API_URL + "tokens",
				{ email, password },
				config
			);
			localStorage.setItem("token", data.token);
			return data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const signup = createAsyncThunk(
	"signup",
	async ({ first_name, last_name, email, password }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post(
				API_URL + "me",
				{ first_name, last_name, email, password },
				config
			);
			if (data.status === 200) {
				localStorage.setItem("token", data.token);
			}
			return data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
