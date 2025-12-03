import { type FC, useState } from "react";
import { useCoupons } from "../../hooks/useCoupons";
import { Coupon } from "../../../types";
import CouponList from "../../components/adminPage/CouponList";
import CouponForm from "../../components/adminPage/CouponForm";
import Section from "../../components/_common/Section";

interface IProps {}

const CouponManagement: FC<IProps> = () => {
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "amount",
    discountValue: 0,
  });

  const { coupons, addCoupon, deleteCoupon } = useCoupons();

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon(couponForm);
    setCouponForm({
      name: "",
      code: "",
      discountType: "amount",
      discountValue: 0,
    });
    setShowCouponForm(false);
  };

  return (
    <Section title="쿠폰 관리">
      <CouponList
        coupons={coupons}
        onAddClick={() => setShowCouponForm(true)}
        onDelete={deleteCoupon}
      />

      {showCouponForm && (
        <CouponForm
          couponForm={couponForm}
          setCouponForm={setCouponForm}
          onSubmit={handleCouponSubmit}
          onCancel={() => setShowCouponForm(false)}
        />
      )}
    </Section>
  );
};

export default CouponManagement;
