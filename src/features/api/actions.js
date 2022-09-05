import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://test-api.sytbuilder.com/";

export const fetchItems = createAsyncThunk(
	"items/fetchItems",
	async ({ rejectWithValue }) => {
		try {
			let token = JSON.parse(localStorage.getItem(token));
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			};
			const { data } = await axios.get(API_URL + "items", config);
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

export const addNewItem = createAsyncThunk(
	"addNewItem",
	async ({ name, description }, { rejectWithValue }) => {
		try {
			let token = JSON.parse(localStorage.getItem(token));
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			};
			const { item } = await axios.post(API_URL + "items", config, {
				name,
				description,
			});
			return item;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const updateItem = createAsyncThunk(
	"updateItem",
	async ({ item, id }, { rejectWithValue }) => {
		try {
			let token = JSON.parse(localStorage.getItem(token));
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			};
			const { data } = await axios.put(`${API_URL}/items/${id}`, config, {
				id,
				item,
			});
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

export const deleteItem = createAsyncThunk(
	"items/deleteItem",
	async ({ id }, { rejectWithValue }) => {
		try {
			let token = JSON.parse(localStorage.getItem(token));
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
			};
			const response = await axios.delete(API_URL + `items/${id}`, id, config);
			if (response?.status === 200) return response;
			return `${response?.status}: ${response?.message}`;
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
