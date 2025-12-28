import React, { useState, useEffect } from "react";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  try {
    useEffect(() => {
      const getProducts = async () => {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
      };
      getProducts();
    }, []);
  } catch (err) {
    console.error(err.message);
  }
  const updateProduct = async (id, newPrice) => {
    try {
      const body = { price: newPrice };
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1>Store Inventory</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}-{product.price} RWF (Stock:{product.stock_quantity})
            <button
              onClick={() => {
                const newPrice = prompt("Enter New Price", product.price);
                if (newPrice) updateProduct(product.id, newPrice);
              }}
            >
              Edit
            </button>{" "}
            <br />
            <button onClick={() => deleteProduct(product.id)}>
              Delete Product
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListProducts;
