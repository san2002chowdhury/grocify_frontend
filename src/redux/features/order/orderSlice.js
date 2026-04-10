import { createSlice } from "@reduxjs/toolkit"
import { createOpOrder, deleteUserOrder, getAllOrders, getUserOrders, orderStatusManage, placeCashOnDeliveryOrder, verifyUserPayment } from "./orderThunk"

const initialState = {
    loading: false,
    error: null,
    key: null,
    orderId: null,
    amount: null,
    currency: "INR",
    order: null,
    orders: [],
    paymentStatus: null,
    success: false,
    page: 1,
    hasMore: true
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetState: (state) => {
            state.key = null;
            state.orderId = null;
            state.amount = null;
            state.currency = "INR";
            state.order = null;
            state.orders = [];
            state.paymentStatus = null;
            state.success = false;
            state.updatedOrderId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeCashOnDeliveryOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeCashOnDeliveryOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.order = action.payload.order;
            })
            .addCase(placeCashOnDeliveryOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createOpOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOpOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.key = action.payload.key;
                state.orderId = action.payload.razorpayOrder.id;
                state.amount = action.payload.razorpayOrder.amount;
                state.order = action.payload.order;
                state.paymentStatus = "pending"
            })
            .addCase(createOpOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyUserPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUserOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.key = null;
                state.orderId = null;
                state.amount = null;
                state.currency = "INR";
                state.order = null;
                state.paymentStatus = null;
                state.success = false;
            })
            .addCase(deleteUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.orders = [...state.orders, ...action.payload.orders];
                state.hasMore = action.payload.hasMore;
                state.page = action.payload.currentPage;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.orders = [...state.orders, ...action.payload.orders];
                state.hasMore = action.payload.hasMore;
                state.page = action.payload.currentPage;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload;
            })
            .addCase(orderStatusManage.pending, (state, action) => {
                state.updatedOrderId = action.meta.arg._id;
                state.error = null;
            })
            .addCase(orderStatusManage.fulfilled, (state, action) => {
                state.updatedOrderId = null;
                state.orders = state.orders.map((el) => el?._id === action?.payload?.order?._id ? action?.payload?.order : el)
            })
            .addCase(orderStatusManage.rejected, (state, action) => {
                state.updatedOrderId = null;
                state.error = action.payload
            })

    }
})
export const { resetState } = orderSlice.actions;
export default orderSlice.reducer;