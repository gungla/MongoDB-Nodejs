const ProductosModel = require("../persistencia/productos");

class Productos {

  async listar() {
    const productos = await ProductosModel.listar();
    return productos;
  }

  async listarId(id) {
    const product = await ProductosModel.listarId(id);
    return product;
  }

  async guardar(body) {
    if (body.nombre && body.precio && body.foto) {
      const product = await ProductosModel.guardar(body);
      return product;
    } else return;
  }

  async actualizar(id, body) {
    let productExists = await this.listarId(id);

    if (productExists) {
      const newProduct = Object.assign(productExists[0], body);
      const product = await ProductosModel.actualizar(id, newProduct);
      return newProduct;
    } else return;
  }

  async borrar(id) {
    let productExists = this.listarId(id);

    if (productExists) {
      const product = await ProductosModel.borrar(id)
      return productExists;
    } else return;
  }
}

module.exports = new Productos();
