import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../../constants/api";


export const addSingleProduct = createAsyncThunk("product/add", async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${API_URL}product/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(res?.data?.message);
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})


export const getEveryProducts = createAsyncThunk("product/get/infinite", async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API_URL}product/get`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page,
                limit
            }
        });
        return res?.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const getBestSellingProducts = createAsyncThunk("product/get/best_selling", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}product/get/best_selling_products`);
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const getAllProductsByCategory = createAsyncThunk("products/by_category", async ({ id, page = 1, sort }, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}product/get/category_wise_product/${id}`,
            {
                params: {
                    page,
                    sort
                }
            }
        )
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const getProductDetails = createAsyncThunk("product/get_product_details", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}product/get/single_product/${id}`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})



export const getAllProductsAdvance = createAsyncThunk("product/getAll_products_advance", async (params, { rejectWithValue }) => {
    try {
        const { page, limit, search, sort } = params;

        const res = await axios.get(`${API_URL}product/get/allProducts`, {
            params: { page, limit, search, sort }
        });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const updateProductStock = createAsyncThunk("product/update_stock/infinite", async ({ id, inStock }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.patch(`${API_URL}product/update/stock/${id}`, { inStock }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(res?.data?.message);
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})












