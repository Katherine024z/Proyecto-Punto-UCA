import express from 'express';
import cors from 'cors';
import { initializeDb } from './data/dbConfig.js';
import rutas from './enrutador/rutas.js';
import { PORT } from "./llaves/llaves.js";

const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

initializeDb()
  .then((pool) => {
    console.log("Servidor listo. La conexión a SQL Server está activa.");

    app.use((req, res, next) => {
      req.db = pool;
      next();
    });

    app.use('/', rutas);

    app.use((req, res, next) => {
      res.status(404).json({ mensaje: 'Ruta no encontrada'});
    });

    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "No se pudo conectar a la base de datos. Servidor no iniciado.",
      err.message
    );
    process.exit(1);
  });
