import { createSlice } from "@reduxjs/toolkit"
import { addProductToCart, clearWholeCart, getCartProducts, removeItemFromCart, updateProductQuatityInCart } from "./cartThunk";

const initialState = {
    loading: false,
    error: null,
    cart: [],
    loadingId: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.pending, (state, action) => {
                console.log(action)
                state.loading = true;
                state.loadingId = action.meta.arg.productId;
                state.error = null;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.loadingId = null;
                state.cart = action.payload.cart;
                console.log(action.payload.cart);
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.loadingId = null;

            })
            .addCase(getCartProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart;
            })
            .addCase(getCartProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state, error = action.payload;
            })
            .addCase(clearWholeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearWholeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart;
            })
            .addCase(clearWholeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProductQuatityInCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductQuatityInCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cart = action.payload.cart;
            })
            .addCase(updateProductQuatityInCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default cartSlice.reducer;