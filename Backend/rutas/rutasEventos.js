import {Router} from 'express';
import {sql} from '../db/dbConfig.js';

const router = Router();

//ruta para obtener todos los eventos de la bd
router.get('/eventos', async (req, res) => {
    try{
        const pool = req.db;
        const resultado = await pool.request().query(`
            SELECT e.nombre, e.fecha, c.categoria
            FROM Evento e
            INNER JOIN Categoria c ON e.id_categoria = c.id
			INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
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

export default router;