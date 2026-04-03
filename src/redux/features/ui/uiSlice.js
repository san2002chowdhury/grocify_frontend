import { createSlice, isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";

const excludeTypes = ["cart", "infinite", "contact", "newsletter"];
const notExcluded = (action) => !excludeTypes.some((word) => action.type.includes(word));

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        globalLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher((action) => isPending(action) && notExcluded(action), (state) => {
                state.globalLoading = true;
            })
            .addMatcher((action) => isFulfilled(action) && notExcluded(action), (state) => {
                state.globalLoading = false;
            })
            .addMatcher((action) => isRejected(action) && notExcluded(action), (state) => {
                state.globalLoading = false;
            })
    },
});

export default uiSlice.reducer;
