import { createSlice } from "@reduxjs/toolkit";
import { addSingleProduct, getAllProductsAdvance, getAllProductsByCategory, getBestSellingProducts, getEveryProducts, getProductDetails, updateProductStock } from "./productThunk";

const initialState = {
    loading: false,
    error: null,
    products: [],
    singleProduct: null,
    currentPage: 1,
    hasMore: true
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProductState: (state) => {
            state.products = [];
            state.singleProduct = null
            state.currentPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products.unshift(action.payload?.populatedProduct);
            })
            .addCase(addSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getEveryProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEveryProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = [...state.products, ...action.payload?.products];
                state.hasMore = action.payload.hasMore;
                state.page = action.payload.currentPage;
            })
            .addCase(getEveryProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })


            .addCase(getBestSellingProducts.pending, (state) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(getBestSellingProducts.fulfilled, (state, action) => {
                state.pending = false;
                state.error = null;
                state.products = action.payload.products;
            })
            .addCase(getBestSellingProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(getAllProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.totalPage = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getAllProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = true;
                state.error = null;
                state.products = action.payload.relatedProducts;
                state.singleProduct = action.payload.product;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = null;
            })

            .addCase(getAllProductsAdvance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProductsAdvance.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.currentPage = action.payload.currentPage;
                state.totalPage = action.payload.totalPages;
            })
            .addCase(getAllProductsAdvance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProductStock.pending, (state) => {
                state.error = null;
            })
            .addCase(updateProductStock.fulfilled, (state, action) => {
                state.error = null;
                const updatedProduct = action.payload.product;
                state.products = state.products.map((product) => product._id === updatedProduct._id ? updatedProduct : product)
            })
            .addCase(updateProductStock.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;