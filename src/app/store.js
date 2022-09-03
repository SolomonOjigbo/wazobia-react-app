import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/item/itemSlice";
import authReducer from "../features/user/userSlice";

export const store = configureStore({
	reducer: {
		user: authReducer,
		item: itemReducer,
	},
});
