import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
// Get all products
app.get("/products", async (req, res) => {
  try {
    const allProducts = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );
    res.json(allProducts.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Add product
app.post("/products", async (req, res) => {
  const { name, price, stock_quantity } = req.body;

  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name,price,stock_quantity) VALUES ($1,$2,$3) RETURNING *",
      [name, price, stock_quantity]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update products
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { price, stock_quantity } = req.body;
    const updateProduct = await pool.query(
      "UPDATE products SET price=$1,stock_quantity=$2 WHERE id=$3 RETURNING *",
      [price, stock_quantity, id]
    );
    if (updateProduct.rows.length === 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json({ message: "Product Updated!", product: updateProduct.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete a Product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    if (deleteProduct.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found and it is not deleted successful",
      });
    }
    res.json({
      message: "Product is deleted successful",
      deletedItem: deleteProduct.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running and connected to the database`);
});
