import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../constants/api";
import toast from "react-hot-toast";


export const placeCashOnDeliveryOrder = createAsyncThunk("order/cod", async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${API_URL}order/place_order`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const createOpOrder = createAsyncThunk("order/create/op", async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${API_URL}order/create_order`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);

        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const verifyUserPayment = createAsyncThunk("order/verify", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}order/verify_payment`, data);
        console.log(res.data);
        return res.data;

    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const deleteUserOrder = createAsyncThunk("order/delete", async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.delete(`${API_URL}order/delete_order/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);

        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const getUserOrders = createAsyncThunk("order/getAll/infinite/user", async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}order/get/orders`, {
            params: { page, limit },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const getAllOrders = createAsyncThunk("order/getAll/infinite", async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}order/get/allOrders`,
            {
                params: { page, limit },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})

export const orderStatusManage = createAsyncThunk("order/status/infinite", async ({ _id, status }, { rejectWithValue }) => {
    try {
        console.log(_id, status);

        const token = localStorage.getItem("token");
        const res = await axios.post(`${API_URL}order/manage`, { _id, status }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        toast.success(res.data.message)
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message);
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )
    }
})