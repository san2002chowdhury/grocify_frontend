import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../../constants/api";

export const sendMessage = createAsyncThunk("contact/message", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}contact/send/message`, data)
        toast.success(res.data.message)
        return true;
    } catch (e) {
        toast.error(e.response?.data?.error || e.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e.response?.data?.error || "Something went wrong!"
        );
    }
})