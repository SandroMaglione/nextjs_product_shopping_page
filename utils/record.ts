import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { lookup, modifyAt, upsertAt } from 'fp-ts/lib/Record';
import { deleteAt } from 'fp-ts/lib/Record';
import { Product, ProductInCart, ProductKey } from 'app-types';

/**
 * If given `product` is present in `record`, then add `1` to the amount.
 * Otherwise insert the `product` in the `record` with initial amount of `1`.
 */
export const increaseOrInsertInRecord =
  (product: Product) =>
  (
    record: Record<ProductKey, ProductInCart>
  ): Record<ProductKey, ProductInCart> =>
    pipe(
      record,
      modifyAt(product.productId.value, (productInCart) => ({
        ...productInCart,
        amount: productInCart.amount + 1,
      })),
      O.getOrElse(() =>
        pipe(
          record,
          upsertAt(product.productId.value, {
            product,
            amount: 1,
          })
        )
      )
    );

/**
 * If given `product` is present in `record` and its amount is `1`, then remove `product` from `record`.
 * Otherwise decrease the amount by `1`.
 */
export const decreaseOrRemoveFromRecord =
  (product: Product) =>
  (
    record: Record<ProductKey, ProductInCart>
  ): Record<ProductKey, ProductInCart> =>
    pipe(
      record,
      lookup(product.productId.value),
      O.fold(
        () => record,
        (productInCart) =>
          pipe(
            record,
            productInCart.amount === 1
              ? deleteAt(product.productId.value)
              : upsertAt(product.productId.value, {
                  ...productInCart,
                  amount: productInCart.amount - 1,
                })
          )
      )
    );

/**
 * Remove the given `product` from the `record`.
 */
export const removeFromRecord =
  (product: Product) =>
  (
    record: Record<ProductKey, ProductInCart>
  ): Record<ProductKey, ProductInCart> =>
    pipe(record, deleteAt(product.productId.value));
