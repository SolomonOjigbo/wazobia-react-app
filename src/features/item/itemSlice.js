import { createSlice } from "@reduxjs/toolkit";
import { addNewItem, deleteItem, fetchItems, updateItem } from "../api/actions";

const initialState = {
	loading: false,
	error: null,
	success: false,
	item: null,
};

const itemSlice = createSlice({
	name: "item",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchItems.pending, (state, action) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchItems.fulfilled, (state, action) => {
				state.success = true;
				state.error = null;
				state.item = action.payload.item;
			})
			.addCase(fetchItems.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload.message;
			})
			.addCase(addNewItem.fulfilled, (state, action) => {
				state.success = true;
				state.error = null;
				state.item = action.payload.item;
			})
			.addCase(addNewItem.rejected, (state, action) => {
				state.success = false;
				state.error = action.payload.message;
			})
			.addCase(updateItem.fulfilled, (state, action) => {
				state.success = true;
				state.error = null;
				state.item = action.payload.item;
			})
			.addCase(updateItem.rejected, (state, action) => {
				state.success = false;
				state.error = action.payload.message;
				state.item = action.payload.item;
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				state.success = true;
				state.error = null;
				state.item = null;
			});
	},
});

export const selectItem = (state) => state.item.item;

export const getItemError = (state) => state.item.error;

export default itemSlice.reducer;
