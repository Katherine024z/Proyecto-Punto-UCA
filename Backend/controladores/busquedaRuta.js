import { sql } from "../data/dbConfig.js";

const limite_pagina = 15;

const buscarEventos = async (req, res) => {
  try {
    const termino = req.query.termino || "";
    const pagina = parseInt(req.query.pagina) || 1;

    const desplazamiento = (pagina - 1) * limite_pagina;
    const pool = req.db;
    const terminoLike = `%${termino}%`;

    const consultaConteo = `
            SELECT COUNT(*) AS total
            FROM Evento e
            INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
            WHERE er.estado = 'Pendiente' AND e.nombre COLLATE Latin1_General_CI_AI LIKE @termino COLLATE Latin1_General_CI_AI;
        `;

    const consultaBusqueda = `
            SELECT e.nombre, e.fecha, c.categoria, i.URL AS imagen
            FROM Evento e
            INNER JOIN Categoria c ON e.id_categoria = c.id
            INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
            INNER JOIN Imagen i on i.id_evento = e.id
            WHERE er.estado = 'Pendiente' AND e.nombre COLLATE Latin1_General_CI_AI LIKE @termino COLLATE Latin1_General_CI_AI
            ORDER BY e.fecha ASC
            OFFSET @desplazamiento ROWS
            FETCH NEXT @limite ROWS ONLY;
        `;

    const conteoResultado = await pool
      .request()
      .input("termino", sql.NVarChar, terminoLike)
      .query(consultaConteo);

    const totalEventos = conteoResultado.recordset[0].total;

    const eventosResultado = await pool
      .request()
      .input("desplazamiento", sql.Int, desplazamiento)
      .input("limite", sql.Int, limite_pagina)
      .input("termino", sql.NVarChar, terminoLike)
      .query(consultaBusqueda);

    res.status(200).json({
      eventos: eventosResultado.recordset,
      totalEventos: totalEventos,
      eventosPorPagina: limite_pagina,
      paginaActual: pagina,
    });
  } catch (err) {
    console.error("Error en buscarEventos:", err.message);
    res.status(500).json({ error: "Fallo al realizar la búsqueda." });
  }
};

export default buscarEventos;
