import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getProductDetail = createAsyncThunk(
  // The first argument is the action type string
  'productDetail/getProductDetail',
  async (id: string, thunkAPI) => {
    //setLoading(true);
    //thunkAPI.dispatch(productDetailSlice.actions.fetchStart());
    // try {
    const { data } = await axios.get(
      `http://123.56.149.216:8089/api/touristRoutes/${id}`
    );
    //setProduct(data);
    //thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data));
    //   //setLoading(false);
    // } catch (error) {
    // setError(error instanceof Error ? error.message : 'error');
    // setLoading(false);
    //   thunkAPI.dispatch(
    //     productDetailSlice.actions.fetchFail(
    //       error instanceof Error ? error.message : 'error'
    //     )
    //   );
    // }
    return data;
  }
);

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true; // immer will handle this
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
