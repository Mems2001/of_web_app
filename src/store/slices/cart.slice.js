import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: null,
        reducers: {
            setCart: (state,action) => action.payload
        }
    }
);

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer