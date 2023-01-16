import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../models/Product.model';
import { RootState } from '../redux/store';
import { IInitialState } from '../redux/types';

const initialState: IInitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});
export const selectCart = (state: RootState) => state.cart;
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
