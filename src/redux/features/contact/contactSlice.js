import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./contactThunk";

const initialState = {
    loading: false,
    error: null
}

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                console.log(state);

                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default contactSlice.reducer;