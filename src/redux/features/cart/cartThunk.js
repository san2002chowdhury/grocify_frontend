import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../constants/api";
import toast from "react-hot-toast";


export const addProductToCart = createAsyncThunk("cart/add", async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${API_URL}cart/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        toast.success(res?.data?.message);
        return res.data;

    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const getCartProducts = createAsyncThunk("cart/get", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}cart/get`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const removeItemFromCart = createAsyncThunk("cart/delete", async (productId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${API_URL}cart/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(res.data.message);
        return res.data;

    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const clearWholeCart = createAsyncThunk("/removeAll", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${API_URL}cart/clear`, {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const updateProductQuatityInCart = createAsyncThunk("cart/update", async ({ id, quantity }) => {
    try {
        const token = localStorage.getItem("token");
        console.log(id);

        const res = await axios.patch(`${API_URL}cart/update/${id}`, { quantity: quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(res.data.message);
        return res.data;
    } catch (e) {

    }
})