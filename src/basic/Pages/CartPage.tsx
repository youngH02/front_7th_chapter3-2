import { type FC } from "react";
import ProductCards from "../components/ProductCards";
import CartSummary from "../components/CartArea";

interface IProps {
  searchTerm?: string;
}

const CartPage: FC<IProps> = ({ searchTerm }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <ProductCards searchTerm={searchTerm} />
      </div>

      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
