import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk("product/get", async (data, thunkAPI) => {
    try{
        return await productService.getProducts(data);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToWishList = createAsyncThunk("product/wishlist", async (prodId, thunkAPI) => {
    try{
        return await productService.addToWishList(prodId);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk("product/getAProduct", async (prodId, thunkAPI) => {
    try{
        return await productService.getSingleProduct(prodId);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const addRating = createAsyncThunk("product/rating", async (data, thunkAPI) => {
    try{
        return await productService.rateProduct(data);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    product: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })

            .addCase(addToWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishList = action.payload;
                state.message = "Product added to wishlist!";
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })

            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productData = action.payload;
                state.message = "Product Fetched Successfully!";
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })

            .addCase(addRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                state.message = "Rating Added Successfully!";
                if (state.isSuccess){
                    toast.success("Rating Added Successfully!");
                }
            })
            .addCase(addRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
    },
});

export default productSlice.reducer;