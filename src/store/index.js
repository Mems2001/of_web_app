import { configureStore } from "@reduxjs/toolkit";
import profileSlice from './slices/profile.slice';
import locationSlice from './slices/location.slice';
import cartSlice from './slices/cart.slice';

export default configureStore({
    reducer: {
        profileSlice,
        locationSlice,
        cartSlice
    }
})