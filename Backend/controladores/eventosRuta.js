import {sql} from '../data/dbConfig.js';

const limite_pagina = 12;
const getEventos = async (req, res) => {
    try{
        const pool = req.db;
        const pagina = parseInt(req.query.pagina) || 1;
        const desplazamiento = (pagina - 1) * limite_pagina;

        const conteo = `
            SELECT COUNT (*) AS total
            FROM Evento e
            WHERE e.id_estadoRealizacion=1 AND e.id_estadoAprobacion=2;
            `;
        
        const consulta = `
            SELECT e.id, e.nombre, e.fecha, e.descripcion, e.duracion, e.encargado, c.categoria,e.cupos, i.URL AS imagen,
            e.privado, (SELECT COUNT(*) FROM Inscripcion WHERE id_evento = e.id) AS inscritos
            FROM Evento e
            INNER JOIN Categoria c ON e.id_categoria = c.id
            INNER JOIN Imagen i on i.id_evento = e.id
            WHERE e.id_estadoRealizacion=1 AND i.id_tipoImagen=1 AND e.id_estadoAprobacion=2
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