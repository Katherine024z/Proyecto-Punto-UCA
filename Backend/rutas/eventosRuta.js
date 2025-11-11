import {sql} from '../db/dbConfig.js';

const limite_pagina = 12;
const getEventos = async (req, res) => {
    try{
        const pagina = parseInt(req.query.pagina) || 1;
        const desplazamiento = (pagina - 1) * limite_pagina;
        const pool = req.db;

        const conteo = `
            SELECT COUNT (*) AS total
            FROM Evento e
            INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
            WHERE er.estado = 'Pendiente';
            `;
        
        const consulta = `
            SELECT e.nombre, e.fecha, c.categoria, i.URL AS imagen
            FROM Evento e
            INNER JOIN Categoria c ON e.id_categoria = c.id
			INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
            INNER JOIN Imagen i on i.id_evento = e.id
            WHERE er.estado = 'Pendiente'
            ORDER BY e.fecha ASC
            OFFSET @offset ROWS
            FETCH NEXT @limit ROWS ONLY;
        `;
        
        const conteoResultado = await pool.request().query(conteo);
        const totalEventos = conteoResultado.recordset[0].total;

        const eventosResultado = await pool.request()
            .input('offset', sql.Int, desplazamiento)
            .input('limit', sql.Int, limite_pagina)
            .query(consulta);
        
        res.status(200).json({
            eventos: eventosResultado.recordset,
            totalEventos: totalEventos,
            eventosPorPagina: limite_pagina,
            paginaActual: pagina

        });      
    } catch (err) {
        console.error("Error en getEventos con paginación:", err.message);
        res.status(500).json({
            message: 'Error al obtener lista de eventos con paginación.',
            error: err.message
        });
    }

}

export default getEventos;