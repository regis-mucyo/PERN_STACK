import React, { useState } from "react";

const InputProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      const body = { name, price, stock_quantity: stock };
      await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = "/";
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={submitProduct} method="post">
        <h3>Product Name</h3>
        <input
          type="text"
          placeholder="Name of Product"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <h3>Price</h3>
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <h3>Stock</h3>
        <input
          type="number"
          placeholder="Number of Products"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />{" "}
        <br />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
export default InputProduct;
