import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/user.slice';
import adminSlice from './slices/admin.slice';

export default configureStore({
    reducer: {
        userSlice,
        adminSlice
    }
})