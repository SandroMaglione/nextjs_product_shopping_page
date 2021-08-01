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
      {/* List of products */}
      <div className="flex-[8] grid grid-cols-4 gap-16">
        {pipe(
          productList,
          map((product) => (
            <ProductItem key={product.productId.value} product={product} />
          ))
        )}
      </div>

      {/* Cart */}
      {/* <div className="flex-[4] flex flex-col gap-4">
        {pipe(
          cart,
          toArray,
          map(([key, { product, amount }]) => {
            return (
              <div key={key}>
                <p>{product.name}</p>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-[50px] h-[50px]"
                />
                <span>{amount}</span>
                <button
                  type="button"
                  className="btn"
                  onClick={() => dispatch(removeProductFromCart(product))}
                >
                  Remove all
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => dispatch(subtractProductFromCart(product))}
                >
                  Remove -1
                </button>
              </div>
            );
          })
        )}
      </div> */}
    </div>
  );
}
