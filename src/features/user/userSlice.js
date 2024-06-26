import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

const getCustomerFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try{
        return await authService.register(userData);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try{
        return await authService.login(userData);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserProductWishlist = createAsyncThunk("auth/wishlist", async (thunkAPI) => {
    try{
        return await authService.getUserWishlist();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const addProductToCart = createAsyncThunk("auth/cart/add", async (cartData, thunkAPI) => {
    try{
        return await authService.addToCart(cartData);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserCart = createAsyncThunk("auth/cart/get", async (thunkAPI) => {
    try{
        return await authService.getCart();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteCartProduct = createAsyncThunk("auth/cart/product/delete", async (cartItemId, thunkAPI) => {
    try{
        return await authService.removeProductFromCart(cartItemId);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateCartProduct = createAsyncThunk("auth/cart/product/update", async (cartDetail, thunkAPI) => {
    try{
        return await authService.updateProductFromCart(cartDetail);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const createAnOrder = createAsyncThunk("auth/cart/create-order", async (orderDetail, thunkAPI) => {
    try{
        return await authService.createOrder(orderDetail);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk("auth/orders/get", async (thunkAPI) => {
    try{
        return await authService.getUserOrders();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateProfile = createAsyncThunk("auth/profile/update", async (data, thunkAPI) => {
    try{
        return await authService.updateUser(data);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotPasswordToken = createAsyncThunk("auth/password/token", async (data, thunkAPI) => {
    try{
        return await authService.forgotPassToken(data);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetPassword = createAsyncThunk("auth/password/reset", async (data, thunkAPI) => {
    try{
        return await authService.resetPass(data);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteUserCart = createAsyncThunk("auth/cart/delete", async (thunkAPI) => {
    try{
        return await authService.emptyCart();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess){
                    toast.success("User created successfully!");
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error(action.payload.reaponse.data.message);
                }
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess){
                    // localStorage.setItem("token", action.payload.token);
                    toast.success("Login successful!");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error(action.payload.response.data.message);
                }
            })

            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
                state.message = "Wishlist products fetched successfully!";
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error(action.error);
                }
            })

            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                state.message = "Product added to cart successfully!";
                if (state.isSuccess){
                    toast.success("Product added to cart successfully!");
                }
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error(action.error);
                }
            })

            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
                state.message = "Product added to cart successfully!";
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError){
                    toast.error(action.error);
                }
            })

            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                state.message = "Product removed from cart successfully!";
                if (state.isSuccess){
                    toast.success("Product removed from cart successfully!");
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                state.message = "Product updated from cart successfully!";
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderedProduct = action.payload;
                state.message = "Product updated from cart successfully!";
                if (state.isSuccess){
                    toast.success("Ordered Successfully!");
                }
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getOrderedProducts = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                state.message = "User Profile from successfully!";
                if (state.isSuccess){
                    // let currentUserData = JSON.parse(localStorage.getItem("customer"));
                    // let newUserData = {
                    //     _id: currentUserData?._id,
                    //     token: currentUserData?.token,
                    //     firstname: action?.payload?.firstname,
                    //     lastname: action?.payload?.lastname,
                    //     email: action?.payload?.email,
                    //     mobile: action?.payload?.mobile,
                    // };
                    // localStorage.setItem("customer", JSON.stringify(newUserData));
                    // state.user = newUserData;
                    toast.success("Changes saved!");
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.token = action.payload;
                if (state.isSuccess){
                    toast.success("Password Reset Link sent successfully!");
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.pass = action.payload;
                if (state.isSuccess){
                    toast.success("Password Changed successfully!");
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(deleteUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
            })
            .addCase(deleteUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError || !state.isSuccess){
                    toast.error("Something went wrong!");
                }
            })

            .addCase(resetState, () => initialState);

    },
});

export default authSlice.reducer;