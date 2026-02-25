import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//Helper function to load cart items from localStorage
const loadCartFromStorage = () => {
    const storeCart = localStorage.getItem("cart");
    return storeCart ? JSON.parse(storeCart) : { products : []};
};

// HELPER FUNCTION TO SAVE CART TO LACALsTORAGE
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};
//fetch cart for a user or guest 
export const fetchCart = createAsyncThunk("cart/fetchCart",async ({userId, guestId},{rejectWithValue})=> {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`,{params: {userId, guestId},});
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
});

//Add an item to the cart for a user or guest

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, userId, guestId ,size,color},{ rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            productId,
            quantity,
            userId,
            guestId,
            size,
            color
        });
        //saveCartToStorage(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
});

//Update the quantity of an item in the cart 
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({ productId,quantity, userId, guestId, size, color }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId,
            quantity,
            userId,
            guestId,
            size,
            color
        });
        //saveCartToStorage(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
});

//Remove an item from the cart 
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, userId, guestId, size, color }, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "delete",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data: {
                productId,
                userId,
                guestId,
                size,
                color
            },
        });
        //saveCartToStorage(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//Merge guest cart with user cart 
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, { userId,guestId},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
        );
        return response.data;
    } catch (error) {
        // Handle 400 errors gracefully - these are not real errors, just conditions where there's nothing to merge
        if (error.response && error.response.status === 400) {
            const message = error.response.data?.message;
            // These are expected conditions, not errors - return empty cart to indicate success
            if (message === "guest cart is empty" || message === "Guest cart not found") {
                return { products: [], totalPrice: 0 };
            }
        }
        return rejectWithValue(error.response?.data);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers:{
        clearCart:(state) => {
            state.cart = { products: []};
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state , action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        })
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state , action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart";
        })
        .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state , action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update cart item quantity";
        })
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state , action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove from cart";
        })
        .addCase(mergeCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(mergeCart.fulfilled, (state , action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(mergeCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart";
        })
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;