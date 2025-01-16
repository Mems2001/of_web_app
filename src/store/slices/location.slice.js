import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice(
    {
        name: 'location',
        initialState: null,
        reducers: {
            setLocation : (state, action) => action.payload
        }
    }
)

export const {setLocation} = locationSlice.actions
export default locationSlice.reducer