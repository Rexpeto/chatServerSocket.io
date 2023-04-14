import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";

//* Creación de server
const app = express();

//* Creación de servidor http
const server = http.createServer(app);

//* Nueva instancia de servidor socket.io
const socket = new SocketServer(server);

//* Utilización de cors
app.use(cors());

//* Uso de morgan en el server (Muestra mensajes de petición)
app.use(morgan("dev"));

//* Configuración de variables de entorno
dotenv.config();

//* Puerto del server, sino hay puerto en .env coloca el puerto 5000
const port = process.env.PORT ?? "5000";

//* Levanta el server con el puerto definido
app.listen(port);

//* Mensaje de ejecución
console.log(`Server funcionando por el puerto ${port}`);
