const Mensaje = require("../models/mensaje")

class MensajesModel {
  async listar() {
    try {
      let mensajes = await Mensaje.find({}).lean()
      return mensajes;
    } catch (error) {
      throw error;
    }
  }

  async guardar(mensaje) {
    try {
      let mensajes = await Mensaje.create(mensaje)
      return mensajes;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MensajesModel();
