import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: 0,
};
const posSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        updateTotall: (state, action) => {
            state.value += action.payload
        },

    },
});

export const { updateTotall, } = posSlice.actions;


export default posSlice.reducer;
