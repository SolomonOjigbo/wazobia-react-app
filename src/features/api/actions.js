import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://test-api.sytbuilder.com/";

export const fetchItems = createAsyncThunk(
	"items/fetchItems",
	async ({ rejectWithValue }) => {
		try {
			const data = await axios.get(API_URL + "items");
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
	"items/addNewItem",
	async ({ name, description }, { rejectWithValue }) => {
		try {
			const data = await axios.post(API_URL + "items", { name, description });
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

export const updateItem = createAsyncThunk(
	"items/updateItem",
	async ({ item, id }, { rejectWithValue }) => {
		try {
			const data = await axios.put(`${API_URL}/items/${id}`, { id, item });
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
			const response = await axios.delete(API_URL + `items/${id}`, id);
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
