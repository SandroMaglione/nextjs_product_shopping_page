import { RootState } from '@app/store';
import { createSlice } from '@reduxjs/toolkit';
import { Product } from 'app-types';
import { filter, map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { PRODUCT_LIST } from './product-list';

interface ProductsState {
  productList: Product[];
}

const initialState: ProductsState = {
  productList: PRODUCT_LIST,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;

export const selectProductsByCategory = (state: RootState): Product[] => {
  const categoriesSelected = pipe(
    state.categories.categoryList,
    filter(({ isSelected }) => isSelected),
    map(({ category }) => category)
  );

  return pipe(
    state.products.productList,
    filter(
      (product) =>
        categoriesSelected.length === 0 ||
        categoriesSelected.includes(product.category)
    )
  );
};
