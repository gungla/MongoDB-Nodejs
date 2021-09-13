const express = require("express");
const router = express.Router();

// CONTROLLER
const Productos = require("./api/productos");

// RUTAS
router.get("/productos/vista", async (req, res) => {
  const productos = await Productos.listar();
  res.render("lista", { hayProductos: productos });
});

router.get("/productos/listar", async (req, res) => {
  const products = await Productos.listar();
  products.length > 0 ? res.send(products) : res.send({ error: "no hay productos cargados" });
});

router.get("/productos/listar/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Productos.listarId(id);
  product ? res.json(product) : res.send({ error: "producto no encontrado" });
});

router.post("/productos/guardar", async (req, res) => {
  const { body } = req;
  const product = await Productos.guardar(body);
  res.json(product);
});

router.put("/productos/actualizar/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const product = await Productos.actualizar(id, body);
  product ? res.json(product) : res.send({ error: "producto no encontrado" });
});

router.delete("/productos/borrar/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Productos.borrar(id);
  product ? res.json(product) : res.send({ error: "producto no encontrado" });
});

module.exports = router;
