import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice"
import uiReducer from "./features/ui/uiSlice";
import categoryReducer from "./features/category/categorySlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
import contactReducer from "./features/contact/contactSlice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        contact: contactReducer
    }
})

export default store;