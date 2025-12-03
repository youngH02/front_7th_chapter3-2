import { useCallback, useState } from "react";
import { Coupon } from "../../types";
import { initialCoupons } from "../constants";
import { addCouponToList, deleteCouponToList } from "../models/coupon";

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem("coupons");
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const addCoupon = useCallback((newCoupon: Coupon) => {
    setCoupons((prev) => {
      const newCoupons = addCouponToList(prev, newCoupon);

      if (newCoupons === prev) {
        alert("이미 존재하는 쿠폰 코드입니다.");
      } else {
        alert("쿠폰이 추가되었습니다.");
      }
      return newCoupons;
    });
  }, []);

  const deleteCoupon = useCallback((couponCode: string) => {
    setCoupons((prev) => {
      const newCoupons = deleteCouponToList(prev, couponCode);

      // 삭제 성공 여부 확인
      const wasDeleted = newCoupons.length < prev.length;

      if (wasDeleted) {
        alert("쿠폰이 삭제되었습니다.");
      }

      return newCoupons;
    });
  }, []);

  return {
    coupons,
    addCoupon,
    deleteCoupon,
  };
};
