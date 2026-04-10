import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast"
import { API_URL } from "../../../constants/api";



export const registerUser = createAsyncThunk("user/register", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}user/register`, data);
        toast.success(res.data.message);
        return res.data;
    } catch (e) {
        toast.error(e.response?.data?.error || e.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e.response?.data?.error || "Something went wrong!"
        );
    }
})

export const verifyUserEmail = createAsyncThunk("user/email_verify", async (token, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}user/verify/${token}`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.success(res.data.message);
        return res;
    }
    catch (e) {
        toast.error(e.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e.response?.data?.message || "Something went wrong!"
        );
    }

})


export const resendVerifyToken = createAsyncThunk("user/resend_verify_token", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}user/resend_token`, data);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.success(res.data.message)
        return res.data;


    } catch (e) {
        return rejectWithValue(
            e.response?.data?.message || "Something went wrong!"
        );
    }
})



export const loginUser = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}user/login`, data);
        toast.success(res.data.message);
        return res.data;

    } catch (e) {
        toast.error(e?.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        );
    }
})

export const forgotPassword = createAsyncThunk("user/forgot_password", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}user/forgot_password`, data);
        toast.success(res?.data?.message);
        return res.data;

    }
    catch (e) {
        toast.error(e?.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        );
    }
})

export const verifyUserOtp = createAsyncThunk("user/verify_otp", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}user/verify_otp`, data);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.success(res?.data?.message)
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        );
    }
})

export const resetUserPassword = createAsyncThunk("user/reset_password", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}user/reset_password`, data);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.success(res?.data?.message);
        return res.data;
    }
    catch (e) {
        toast.error(e?.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        );
    }
})

export const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
            `${API_URL}user/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.success(res.data.message);
        return true;
    }
    catch (e) {
        toast.error(e?.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        );
    }
})



export const getUserData = createAsyncThunk("user/getData", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}user/get`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    }
    catch (e) {
        toast.error(e.response?.data?.error || e.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e.response?.data?.error || "Something went wrong!"
        );
    }
})

export const updateUserProfile = createAsyncThunk("user/update", async (data, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${API_URL}user/update_profile`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(res.data.message)
        return res.data;


    } catch (e) {
        toast.error(e.response?.data?.error || e.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e.response?.data?.error || "Something went wrong!"
        );
    }
})