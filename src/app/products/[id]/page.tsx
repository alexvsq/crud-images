import axios from "axios";
import Buttons from "./buttons";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
};

async function loadProduct(product: Product) {
  const { data } = await axios.get(
    "http://localhost:3000/api/products/" + product.id
  );
  return data;
}

export default async function Page({ params }: { params: Product }) {
  const pro: Product = await loadProduct(params);
  console.log(pro);

  return (
    <section className=" text-black flex justify-center items-center">
      <div className="p-6 bg-white">
        <p>Name : {pro.name}</p>
        <p>Price : {pro.price}</p>
        <p>Description : {pro.description}</p>

        <Buttons product={pro} />
      </div>
    </section>
  );
}
