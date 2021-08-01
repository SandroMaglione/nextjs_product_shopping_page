/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  addProductToCart,
  removeProductFromCart,
  subtractProductFromCart,
  toggleShowingCart,
} from '@controllers/features/cart/cart-slice';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { toArray } from 'fp-ts/lib/Record';
import { ReactElement } from 'react';

export default function CartSidebar(): ReactElement {
  const cart = useAppSelector((state) => state.cart.productInCart);
  const isShowing = useAppSelector((state) => state.cart.isCartShowing);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${
        isShowing ? 'translate-x-0' : 'translate-x-[100%]'
      } transition-transform shadow-xl duration-150 ease-in-out fixed top-0 right-0 w-[400px] h-screen overflow-y-scroll transform bg-white border border-gray-200 flex flex-col gap-4`}
    >
      <div className="flex items-center p-[24.61px]">
        <div className="flex-1 text-center">
          <span className="text-xl font-medium text-black">Your Cart</span>
        </div>
        <div className="flex-none">
          <button
            type="button"
            className="hover:text-gray-500"
            onClick={() => dispatch(toggleShowingCart())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-[#F5F2EA] mx-[24px]">
        {pipe(
          cart,
          toArray,
          map(([key, { product, amount }]) => {
            const totalPrice = product.price * amount;
            return (
              <div
                key={key}
                className="flex flex-col m-2 bg-white border border-gray-200"
              >
                <div className="flex items-center gap-6 p-4">
                  <div className="flex items-center justify-center flex-none">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-[50px] h-[50px] mx-auto"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black">
                      {product.name}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs font-medium text-gray-900">{`$${(
                        totalPrice / 100
                      ).toFixed(2)}`}</span>
                      <span className="text-xs font-light text-gray-800">{`x${amount}`}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => dispatch(removeProductFromCart(product))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-[2]">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => dispatch(subtractProductFromCart(product))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-[2]">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => dispatch(addProductToCart(product))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
