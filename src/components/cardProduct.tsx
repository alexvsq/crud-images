import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
};

type CardProductProps = {
  product: Product;
};

export default function CardProduct({ product }: CardProductProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white hover:bg-gray-200 cursor-pointer rounded-lg border-gray-800 mb-3 p-2"
    >
      <h1 className="text-lg font-bold text-slate-500">{product.name}</h1>
      <h2 className="text-2xl text-slate-600">{product.name}</h2>
      <p className="text-slate-600">{product.description}</p>
    </Link>
  );
}
