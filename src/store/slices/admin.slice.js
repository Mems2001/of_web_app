import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "userIsAdmin",
    initialState: false,
    reducers: {
        setAdmin: state => state = true,
        unsetAdmin: state => state = false
    }
})

export const {setAdmin , unsetAdmin} = adminSlice.actions;
export default adminSlice.reducer