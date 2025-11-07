import express from 'express';
import cors from 'cors';
import { initializeDb} from './db/dbConfig.js';
import rutasEventos from './rutas/rutasEventos.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
}));

app.use(express.json());

const PORT = 4000;

initializeDb()
  .then((pool) => {
    console.log("Servidor listo. La conexión a SQL Server está activa.");

    app.use((req, res, next) => {
      req.db = pool;
      next();
    });

    app.use('/', rutasEventos);

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
