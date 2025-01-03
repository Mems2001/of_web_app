import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice(
    {
        name: 'profile',
        initialState: null,
        reducers: {
            setProfile : (state, action) => action.payload
        }
    }
)

export const {setProfile} = profileSlice.actions
export default profileSlice.reducer