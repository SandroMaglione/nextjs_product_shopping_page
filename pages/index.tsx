/* eslint-disable @next/next/no-img-element */
import * as O from 'fp-ts/Option';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { lookup } from 'fp-ts/lib/Record';
import { ReactElement } from 'react';
import {
  addProductToCart,
  removeProductFromCart,
  subtractProductFromCart,
} from '@controllers/features/cart/cart-slice';
import { selectProductsByCategory } from '@controllers/features/products/products-slice';
import { toArray } from 'fp-ts/lib/Record';
import NavMenu from '@components/NavMenu';
import CategoryFilter from '@components/CategoryFilter';

export default function Home(): ReactElement {
  const productList = useAppSelector(selectProductsByCategory);
  const cart = useAppSelector((state) => state.cart.productInCart);
  const dispatch = useAppDispatch();
  return (
    <div>
      <NavMenu />
      <main className="px-[100px] py-[24px]">
        {/* Categories filter */}
        <CategoryFilter />
        <div className="flex gap-16">
          {/* List of products */}
          <div className="flex-[8] grid grid-cols-3 gap-10">
            {pipe(
              productList,
              map((product) => {
                return (
                  <div key={product.productId.value}>
                    <span>{product.name}</span>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-[100px] h-[100px]"
                    />

                    {pipe(
                      cart,
                      lookup(product.productId.value),
                      O.fold(
                        () => (
                          <button
                            type="button"
                            className="btn"
                            onClick={() => dispatch(addProductToCart(product))}
                          >
                            Add to cart
                          </button>
                        ),
                        ({ amount }) => (
                          <div className="flex">
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                dispatch(addProductToCart(product))
                              }
                            >
                              {`${amount} in cart, add +1`}
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                dispatch(subtractProductFromCart(product))
                              }
                            >
                              {`${amount} in cart, remove -1`}
                            </button>
                          </div>
                        )
                      )
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Cart */}
          <div className="flex-[4] flex flex-col gap-4">
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
          </div>
        </div>
      </main>
    </div>
  );
}
