import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userIsLoggedIn',
    initialState: false,
    reducers: {
        setLogin: state => state = true,
        setLogout: state => state = false
    }
})

export const { setLogin , setLogout } = userSlice.actions
export default userSlice.reducer