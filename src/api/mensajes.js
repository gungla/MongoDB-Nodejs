const MensajesModel = require("../persistencia/mensajes");

class Mensajes {
  async listar() {
    const mensajes = await MensajesModel.listar();
    return mensajes;
  }

  async guardar(mensaje) {
    const mensajes = await MensajesModel.guardar(mensaje);
    return mensajes;
  }
}

module.exports = new Mensajes();