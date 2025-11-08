import {Router} from 'express';
import {sql} from '../db/dbConfig.js';

const router = Router();

//ruta para obtener todos los eventos de la bd
router.get('/eventos', async (req, res) => {
    try{
        const pool = req.db;
        const resultado = await pool.request().query(`
            SELECT e.nombre, e.fecha, c.categoria, i.URL AS imagen
            FROM Evento e
            INNER JOIN Categoria c ON e.id_categoria = c.id
			      INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
            INNER JOIN Imagen i on i.id_evento = e.id
			      WHERE er.estado = 'Pendiente'
            ORDER BY e.fecha ASC;
            `);
        res.status(200).json(resultado.recordset);
    } catch (err) {
        console.error("Error en GET /eventos:", err.message);
        res.status(500).json({
            message: 'Error al obtener lista de eventos.',
            error: err.message
        });
    }
});

//ruta para obtener eventos filtrados
router.get("/eventos/categoria/:nombreCategoria", async (req, res) => {
  try {
    const { nombreCategoria } = req.params;

    const consulta = `
    SELECT e.nombre, e.fecha, c.categoria FROM Evento E
    JOIN Categoria C ON E.id_categoria = C.id
    WHERE C.categoria = @categoria
    ORDER BY e.fecha ASC`;
      
    const pool = req.db;
    const resultado = await pool
      .request()
      .input("categoria", sql.VarChar, nombreCategoria) 
      .query(consulta);
    res.json(resultado.recordset);
  } catch (err) {
    console.error("Error en GET /eventos/categoria:", err.message);
    res.status(500).json({ mensaje: "Error al filtrar eventos por categoria" });
  }});
export default router;