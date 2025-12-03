import { useState } from "react";
import { CartItem, Coupon, ProductWithUI } from "../../types";
import {
  addItemToCart,
  calculateCartTotal,
  getRemainingStock,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../models/cart";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: ProductWithUI) => {
    setCart((prev) => {
      const newCart = addItemToCart(prev, product);

      if (newCart === prev) {
        alert(`재고는 ${product.stock}개까지만 있습니다.`);
      }

      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => removeItemFromCart(prev, productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  };

  const emptyCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  const applyCoupon = (coupon: Coupon | null) => {
    if (!coupon) {
      setSelectedCoupon(null);
      return;
    }

    const { totalAfterDiscount } = calculateTotal();

    // TODO: 이 로직도 models/cart로 이동하면 더 좋을 듯
    if (totalAfterDiscount < 10000 && coupon.discountType === "percentage") {
      alert("percentage 쿠폰은 10,000원 이상 구매 시 사용 가능합니다.");
      return;
    }

    setSelectedCoupon(coupon);
  };

  const getStock = (product: ProductWithUI) => {
    return getRemainingStock(cart, product);
  };

  return {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    emptyCart,
    getStock,
    applyCoupon,
    calculateTotal,
  };
};
