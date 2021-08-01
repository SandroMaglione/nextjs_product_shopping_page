import { useAppDispatch, useAppSelector } from '@app/hooks';
import { pipe } from 'fp-ts/lib/function';
import { toggleProductCategory } from '@controllers/features/categories/categories-slice';
import { ReactElement } from 'react';
import { map } from 'fp-ts/lib/Array';

export default function CategoryFilter(): ReactElement {
  const categoryList = useAppSelector((state) => state.categories.categoryList);
  const dispatch = useAppDispatch();
  return (
    <div>
      <p className="text-sm font-bold text-black">Shop by category</p>
      <div className="mt-[16px] flex flex-wrap gap-[9px]">
        {pipe(
          categoryList,
          map(({ category, isSelected }) => (
            <button
              key={category}
              type="button"
              onClick={() => dispatch(toggleProductCategory(category))}
              className={`${
                isSelected
                  ? 'bg-[#EC6661] text-white hover:bg-gray-400'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              } font-light border border-gray-200 rounded-3xl px-5 py-1 text-base`}
            >
              {category}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
