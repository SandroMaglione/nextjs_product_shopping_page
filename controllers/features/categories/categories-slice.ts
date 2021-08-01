import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCategory, ProductCategorySelected } from 'app-types';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { CATEGORY_LIST } from '../products/product-list';

interface CategoriesState {
  categoryList: ProductCategorySelected[];
}

const initialState: CategoriesState = {
  categoryList: pipe(
    CATEGORY_LIST,
    map(
      (category): ProductCategorySelected => ({
        category,
        isSelected: false,
      })
    )
  ),
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    toggleProductCategory(state, action: PayloadAction<ProductCategory>) {
      state.categoryList = pipe(
        state.categoryList,
        map(
          (productCategorySelected): ProductCategorySelected =>
            productCategorySelected.category === action.payload
              ? {
                  ...productCategorySelected,
                  isSelected: !productCategorySelected.isSelected,
                }
              : productCategorySelected
        )
      );
    },
  },
});

export const { toggleProductCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
