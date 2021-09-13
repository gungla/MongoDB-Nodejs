const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const productos = require("./src/api/productos");
const mensajes = require("./src/api/mensajes");
require("./src/database/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs"
  })
);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

io.on("connection", async socket => {
  console.log("Nuevo cliente conectado!");

  socket.emit("productos", await productos.listar());
  socket.emit("showMessages", await mensajes.listar());

  // CHAT
  socket.on("newMessage", async mensaje => {
    await mensajes.guardar(mensaje);
    io.sockets.emit("showMessages", await mensajes.listar());
  });

  //   /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  socket.on("update", data => {
    io.sockets.emit("productos", productos.listar());
  });
});

// protejo el servidor ante cualquier excepción no atrapada
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Algo se rompio!");
});

// importo las rutas y las uso con el prefijo /api
const router = require("./src/routes");
app.use("/api", router);

// obtengo el puerto del environment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
server.on("error", error => {
  console.log("error en el servidor:", error);
});
