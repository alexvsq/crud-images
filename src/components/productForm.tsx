"use client";
import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function productForm() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [files, setFiles] = useState<File | null>(null);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const form = useRef<HTMLFormElement | null>(null);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price.toString());
      formData.append("description", product.description);
      if (files) {
        formData.append("image", files!);
      }

      const result = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result);
    } else {
      const res = await axios.put("/api/products/" + params.id, product);
      console.log(res);
    }
    if (form.current) {
      form.current.reset();
    }
    router.push("/products");
    router.refresh();
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" bg-white shadow-lg rounded-md px-8 pt-6 pb-8 mb-4"
        ref={form}
      >
        <label
          htmlFor="name"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Product Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          onChange={(e) => handleChange(e)}
          value={product.name}
        />

        <label
          htmlFor="price"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Product Price:
        </label>
        <input
          name="price"
          type="number"
          placeholder="0.00"
          className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          onChange={(e) => handleChange(e)}
          value={product.price}
        />

        <label
          htmlFor="name"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Product Description:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="description"
          className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          onChange={(e) => handleChange(e)}
          value={product.description}
        />

        <label
          htmlFor="ProductImage"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Product Image:
        </label>
        <input
          type="file"
          className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          onChange={(e) => {
            setFiles(e.target.files && e.target.files[0]);
          }}
        />

        {files && (
          <img
            className="w-80 h-64 object-contain mx-auto"
            src={URL.createObjectURL(files)}
            alt=""
          />
        )}

        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md">
          {params.id ? "Update" : "Save Product"}
        </button>
      </form>
    </div>
  );
}
