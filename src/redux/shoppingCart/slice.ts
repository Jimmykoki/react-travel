import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: false,
  error: null,
  items: [],
};

export const getShoppingCart = createAsyncThunk(
  'shoppingCart/getShoppingCart',
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      'http://123.56.149.216:8089/api/shoppingCart',
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCartItem',
  async (
    paramaters: {
      jwt: string;
      touristRouteId: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post(
      'http://123.56.149.216:8089/api/shoppingCart/items',
      {
        touristRouteId: paramaters.touristRouteId,
      },
      {
        headers: {
          Authorization: `Bearer ${paramaters.jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const checkout = createAsyncThunk(
  'shoppingCart/checkout',
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(
      'http://123.56.149.216:8089/api/shoppingCart/checkout',
      null,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);

export const clearShoppingCartItem = createAsyncThunk(
  'shoppingCart/clearShoppingCartItem',
  async (
    paramaters: {
      itemIds: number[];
      jwt: string;
    },
    thunkAPI
  ) => {
    return await axios.delete(
      `http://123.56.149.216:8089/api/shoppingCart/items/(${paramaters.itemIds.join(
        ','
      )})`,
      {
        headers: {
          Authorization: `Bearer ${paramaters.jwt}`,
        },
      }
    );
  }
);

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [addShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
    [clearShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
    [checkout.pending.type]: (state) => {
      state.loading = true;
    },
    [checkout.fulfilled.type]: (state) => {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
