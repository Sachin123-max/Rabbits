import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FETCH USERS (FIXED ❗ MUST RETURN)
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data; // ✅ IMPORTANT FIX
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching users");
    }
  }
);

// ADD USER (FIXED SAFELY)
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data; // ⚠️ return full response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add user failed");
    }
  }
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [], // ✅ always array
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload || []; // ✅ safe fallback
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD USER
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;

        const newUser = action.payload?.user || action.payload; 
        // ✅ handles both API formats

        if (newUser) {
          state.users.push(newUser);
        }
      })

      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE USER
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;

        const index = state.users.findIndex(
          (u) => u._id === updatedUser._id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      // DELETE USER
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (u) => u._id !== action.payload
        );
      });
  },
});

export default adminSlice.reducer;