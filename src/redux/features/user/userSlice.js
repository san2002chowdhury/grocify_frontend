import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, getUserData, loginUser, logoutUser, registerUser, resendVerifyToken, resetUserPassword, updateUserProfile, verifyUserEmail, verifyUserOtp } from "./userThunks";

const storedUser = localStorage.getItem("user")
let user = null;

try {
    user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null
} catch {
    user = null
}

const initialState = {
    user,
    email: localStorage.getItem("email") || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;
                state.email = action.payload.user.email;
                localStorage.setItem("email", action.payload.user.email);
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(verifyUserEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyUserEmail.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyUserEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(resendVerifyToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resendVerifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.error = null;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(resendVerifyToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.error = null;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.email = action.payload.email;
                localStorage.setItem("email", action.payload.email);
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.email = action.payload;
            })

            .addCase(verifyUserOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyUserOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.email = action.payload.email;
                localStorage.setItem("email", action.payload.email);
            })
            .addCase(verifyUserOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(resetUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resetUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = [];
                state.email = null;
                state.token = null;
                localStorage.removeItem("user")
                localStorage.removeItem("email")
                localStorage.removeItem("token");

            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserData.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(getUserData.rejected, (state) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { resetError } = userSlice.actions;

export default userSlice.reducer;