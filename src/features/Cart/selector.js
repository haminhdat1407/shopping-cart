import { createSelector } from '@reduxjs/toolkit';

const cartItemSelector = (state) => state.cart.cartItem;

//Count number of products in cart
export const cartItemCountSelector = createSelector(cartItemSelector, (cartItem) =>
  cartItem.reduce((count, item) => count + item.quantity, 0)
);

//Calculate total of cart
export const cartTotalSelector = createSelector(cartItemSelector, (cartItem) =>
  cartItem.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);
