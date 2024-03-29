import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductInCart, ProductKey } from 'app-types';
import {
  decreaseOrRemoveFromRecord,
  increaseOrInsertInRecord,
  removeFromRecord,
} from '@utils/record';

interface CartState {
  productInCart: Record<ProductKey, ProductInCart>;
  isCartShowing: boolean;
}

const initialState: CartState = {
  productInCart: {},
  isCartShowing: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<Product>) {
      state.productInCart = increaseOrInsertInRecord(action.payload)(
        state.productInCart
      );
    },
    subtractProductFromCart(state, action: PayloadAction<Product>) {
      state.productInCart = decreaseOrRemoveFromRecord(action.payload)(
        state.productInCart
      );
    },
    removeProductFromCart(state, action: PayloadAction<Product>) {
      state.productInCart = removeFromRecord(action.payload)(
        state.productInCart
      );
    },
    toggleShowingCart(state) {
      state.isCartShowing = !state.isCartShowing;
    },
  },
});

export const {
  addProductToCart,
  subtractProductFromCart,
  removeProductFromCart,
  toggleShowingCart,
} = cartSlice.actions;
export default cartSlice.reducer;
