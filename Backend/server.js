import express from 'express';
import cors from 'cors';
import { initializeDb, getPool } from './db/dbConfig.js';
import rutasEventos from './rutas/rutasEventos.js';

const app = express();
const PORT = 4000;

app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS. Origen no reconocido."));
    }
  },
};
app.use(cors(corsOptions));

initializeDb()
  .then((pool) => {
    console.log("Servidor listo. La conexión a SQL Server está activa.");

    app.use((req, res, next) => {
      req.db = getPool;
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
