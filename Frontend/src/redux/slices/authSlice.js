import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")):null;

// Check for as existing guest ID in the localstorage or generate a new One
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

//Initail state of the auth slice
const initialState = {
    user:userFromStorage,
    guestId:initialGuestId,
    loading:false,
    error:null,
};

//Async thunk for user login

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, {rejectWithValue}) => {
    try {
        // Validate userData before sending
        if (!userData.email || !userData.password) {
            return rejectWithValue({ message: "Email and password are required" });
        }
        
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/login`, 
            userData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; // Return the user object from the response
    } catch (error) {
        // Handle different error scenarios
        const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
        return rejectWithValue({ message: errorMessage });
    }
});

//Async thunk for user registration

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, {rejectWithValue}) => {
    try {
        // Validate userData before sending
        if (!userData.name || !userData.email || !userData.password) {
            return rejectWithValue({ message: "Name, email, and password are required" });
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/register`, 
            userData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; // Return the user object from the response
    } catch (error) {
        // Handle different error scenarios
        const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
        return rejectWithValue({ message: errorMessage });
    }
});

// Auth slice
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; //Reset guest ID on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId); //Set new guest ID in localStorage
        },
        generateNewGuestId:(state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        },
    },
    extraReducers:(builder) => {builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
        }) 
        .addCase(loginUser.rejected, (state ,action) => {
            state.loading = false;
            state.error = action.payload.message;
        }) 
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        }) 
        .addCase(registerUser.rejected, (state ,action) => {
            state.loading = false;
            state.error = action.payload?.message || action.payload || "Registration failed";
        })
    },
});


export const {logout, generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;