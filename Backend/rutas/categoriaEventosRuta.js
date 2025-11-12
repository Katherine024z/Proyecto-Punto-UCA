import { sql } from "../db/dbConfig.js";

const limite_pagina = 12;
const getEventosPorCategoria = async (req, res) => {
  try {
    const { nombreCategoria } = req.params;
    const pool = req.db;
    const pagina = parseInt(req.query.pagina) || 1;
    const desplazamiento = (pagina - 1) * limite_pagina;

    const conteo = `
      SELECT COUNT (*) AS total
      FROM Evento e
      INNER JOIN Categoria c ON e.id_categoria = C.id
		  INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
      INNER JOIN Imagen i on i.id_evento = e.id
      WHERE c.categoria = @categoria and er.estado = 'Pendiente'
       `;

    const consulta = `
      SELECT e.nombre, e.fecha, c.categoria, i.URL AS imagen FROM Evento e
      INNER JOIN Categoria c ON e.id_categoria = C.id
      INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
      INNER JOIN Imagen i on i.id_evento = e.id
      WHERE c.categoria = @categoria and er.estado = 'Pendiente'
      ORDER BY e.fecha ASC
      OFFSET @desplazamiento ROWS
      FETCH NEXT @limite ROWS ONLY;
      `;

    const conteoResultado = await pool.request()
    .input("categoria", sql.VarChar, nombreCategoria)
    .query(conteo);
    const totalEventos = conteoResultado.recordset[0].total;

    const resultado = await pool
      .request()
      .input("categoria", sql.VarChar, nombreCategoria)
      .input("desplazamiento", sql.Int, desplazamiento)
      .input("limite", sql.Int, limite_pagina)
      .query(consulta);

    res.status(200).json({
    eventos: resultado.recordset,
    totalEventos: totalEventos,
    eventosPorPagina: limite_pagina,
    paginaActual: pagina
});
  } catch (err) {
    console.error("Error en getEventosPorCategoria:", err.message);
    res.status(500).json({ mensaje: "Error al filtrar eventos por categoria" });
  }
};

export default getEventosPorCategoria;
