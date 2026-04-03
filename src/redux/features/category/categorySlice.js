import { createSlice } from "@reduxjs/toolkit"
import { getAllCategories } from "./categoryThunk"

const initialState = {
    categories: [],
    loading: false,
    error: null,
}
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.categories = action.payload.categories;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default categorySlice.reducer;