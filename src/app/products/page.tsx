import axios from "axios";
import CardProduct from "@/components/cardProduct";

export default async function page() {
  async function loadProducts() {
    const { data } = await axios.get("http://localhost:3000/api/products");
    return data.result;
  }
  const products = await loadProducts();
  type Products = {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: string;
  };
  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map((product: Products) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
}
