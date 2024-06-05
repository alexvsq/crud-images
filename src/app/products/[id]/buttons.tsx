"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
};

type ButtonsProps = {
  product: Product;
};

export default function Buttons({ product }: ButtonsProps) {
  const router = useRouter();

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={async () => {
          if (confirm("are you sure , you want to delete this?")) {
            const result = await axios.delete("/api/products/" + product.id);
            if (result.status === 204) {
              router.push("/products");
              router.refresh();
            }
          }
        }}
      >
        Delete
      </button>
      <button className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded">
        Edit
      </button>
    </>
  );
}
