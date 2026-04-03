import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../../constants/api";

export const getAllCategories = createAsyncThunk("category/all", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}category/get`);
        return res.data;
    }
    catch (e) {
        console.log(e?.response?.data?.message);
        toast.error(e?.response?.data?.message || "Something went wrong!");
        return rejectWithValue(
            e?.response?.data?.message || "Something went wrong!"
        )

    }
})