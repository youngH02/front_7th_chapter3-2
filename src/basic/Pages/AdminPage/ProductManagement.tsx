import { useState, type FC } from "react";
import ProductListTable from "../../components/adminPage/ProductListTable";
import ProductForm from "../../components/adminPage/ProductForm";
import { useProducts } from "../../hooks/useProducts";
import { ProductWithUI } from "../../../types";
import Section from "../../components/_common/Section";
import Button from "../../components/_common/Button";

interface IProps {}

const INITIAL_PRODUCT_FORM: Omit<ProductWithUI, "id"> = {
  name: "",
  price: 0,
  stock: 0,
  description: "",
  discounts: [],
};

const ProductManagement: FC<IProps> = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] =
    useState<Omit<ProductWithUI, "id">>(INITIAL_PRODUCT_FORM);

  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const handleAddNew = () => {
    setProductForm(INITIAL_PRODUCT_FORM);
    setEditingProductId(null);
    setShowForm(true);
  };

  const handleEditStart = (product: ProductWithUI) => {
    const { id, ...formData } = product;
    setProductForm(formData);
    setEditingProductId(id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
      updateProduct({ ...productForm, id: editingProductId });
    } else {
      addProduct(productForm);
    }
    handleClose();
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingProductId(null);
  };

  return (
    <Section
      title="상품 목록"
      action={
        <Button
          variant="solid"
          color="secondary"
          size="sm"
          onClick={handleAddNew}>
          새 상품 추가
        </Button>
      }>
      <ProductListTable
        products={products}
        onEdit={handleEditStart}
        onDelete={deleteProduct}
      />

      {showForm && (
        <ProductForm
          productForm={productForm}
          setProductForm={setProductForm}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isEditing={!!editingProductId}
        />
      )}
    </Section>
  );
};

export default ProductManagement;
