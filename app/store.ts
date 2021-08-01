import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from '@controllers/features/categories/categories-slice';
import cartSlice from '@controllers/features/cart/cart-slice';
import productsSlice from '@controllers/features/products/products-slice';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
