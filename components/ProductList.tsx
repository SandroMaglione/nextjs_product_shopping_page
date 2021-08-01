import { ReactElement } from 'react';
import { selectProductsByCategory } from '@controllers/features/products/products-slice';
import { useAppSelector } from '@app/hooks';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import ProductItem from './ProductItem';

export default function ProductList(): ReactElement {
  const productList = useAppSelector(selectProductsByCategory);
  return (
    <div className="flex gap-16 mt-[40px]">
      <div className="flex-[8] grid grid-cols-4 gap-16">
        {pipe(
          productList,
          map((product) => (
            <ProductItem key={product.productId.value} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
