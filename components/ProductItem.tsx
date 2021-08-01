/* eslint-disable @next/next/no-img-element */
import * as O from 'fp-ts/Option';
import {
  addProductToCart,
  subtractProductFromCart,
} from '@controllers/features/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { Product } from 'app-types';
import { ReactElement, ReactNode } from 'react';
import { lookup } from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/function';

export default function ProductItem({
  product,
}: {
  product: Product;
}): ReactElement {
  const cart = useAppSelector((state) => state.cart.productInCart);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col justify-center text-center gap-[18px]">
      <div className="flex flex-col justify-center flex-1">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-[200px] h-[154px] mx-auto"
        />
        <p className="mt-4 text-xs font-light text-black">
          {product.subcategory}
        </p>
        <h2 className="text-sm font-medium px-6 text-black mt-[7.23px]">
          {product.name}
        </h2>
        <p className="text-xs font-light px-6 text-black mt-[7.23px]">
          {product.subtitle}
        </p>
        <p className="text-base font-medium px-6 text-black mt-[7.23px]">
          {`$${(product.price / 100).toFixed(2)}`}
        </p>
      </div>
      <div className="flex-none">
        {pipe(
          cart,
          lookup(product.productId.value),
          O.fold(
            () => (
              <ProductItemButton
                label="Add to Cart"
                icon={
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
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                onClick={() => dispatch(addProductToCart(product))}
              />
            ),
            ({ amount }) => (
              <div className="flex items-center">
                <div className="flex-1">
                  <ProductItemButton
                    icon={
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
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                    onClick={() => dispatch(subtractProductFromCart(product))}
                  />
                </div>
                <div className="flex text-white bg-[#376edd] border border-[#376edd] h-[36px] py-[24px] items-center justify-center flex-none px-8">
                  <span className="text-lg font-black">{`x${amount}`}</span>
                </div>
                <div className="flex-1">
                  <ProductItemButton
                    icon={
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
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                    onClick={() => dispatch(addProductToCart(product))}
                  />
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

const ProductItemButton = ({
  label,
  icon,
  onClick,
}: {
  icon?: ReactNode;
  label?: string;
  onClick: () => void;
}): ReactElement => {
  return (
    <button type="button" className="gap-2 btn" onClick={onClick}>
      {icon}
      {label}
    </button>
  );
};
