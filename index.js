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

//* Configuración de variables de entorno
dotenv.config();

//* SOCKET_EXTERNO
const socket_externo = `${process.env.SOCKET_IP_CLIENT}:${process.env.SOCKET_PORT_CLIENT}`;

console.log(socket_externo);

//* Nueva instancia de servidor socket.io
const socket = new SocketServer(server, {
    cors: {
        origin: ["http://localhost:5173", socket_externo],
    },
});

//* Utilización de cors
app.use(cors());

//* Uso de morgan en el server (Muestra mensajes de petición)
app.use(morgan("dev"));

//* Puerto del server, sino hay puerto en .env coloca el puerto 5000
const port = process.env.PORT ?? "5000";

//* Escucha de socket.io sobre la conexión
socket.on("connection", (socket) => {
    socket.on("message", (mensaje) => {
        socket.broadcast.emit("message", {
            body: mensaje,
            from: socket.id,
        });
    });
});

//* Levanta el server con el puerto definido
server.listen(port);

//* Mensaje de ejecución
console.log(`Server funcionando por el puerto ${port}`);
