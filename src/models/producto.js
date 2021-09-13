const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    timestamp: { type: Date, default: new Date() },
    nombre: { type: String, require: true, max: 100 },
    // descripcion: { type: String, require: true, max: 100 },
    precio: { type: Number, require: true },
    foto: { type: String, require: true }
    // codigo: { type: Number, require: true },
    // stock: { type: Number, require: true }
  },
  { strict: false }
);

const Producto = mongoose.model("productos", schema);

module.exports = Producto;
