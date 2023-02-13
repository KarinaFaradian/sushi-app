import { CartItem } from './../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  let total = items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
  let totalPrice = Math.floor(total * 100) / 100;
  return totalPrice;
};
