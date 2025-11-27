import { sql } from "../data/dbConfig.js";

const limite_pagina = 12;

const getEventosPorCategoria = async (req, res) => {
  try {
    const { nombreCategoria } = req.params;
    const { pagina, busqueda } = req.query;

    const pool = req.db;
    const paginaActual = parseInt(pagina) || 1;
    const desplazamiento = (paginaActual - 1) * limite_pagina;

    let clausulaWhere = `
    WHERE c.categoria = @categoria
    AND e.id_estadoRealizacion = 1
    AND e.id_estadoAprobacion = 2
    `;

    let terminoLike = null;

    if (busqueda) {
      terminoLike = `%${busqueda}%`;
      clausulaWhere += `
        AND e.nombre COLLATE Latin1_General_CI_AI LIKE @termino COLLATE Latin1_General_CI_AI
    `;}

    const conteo = `
      SELECT COUNT (*) AS total
      FROM Evento e
      INNER JOIN Categoria c ON e.id_categoria = C.id
      ${clausulaWhere};
      `;

    const consulta = `
      SELECT e.id, e.nombre, e.fecha, e.descripcion, e.duracion, e.encargado, c.categoria,e.cupos, i.URL AS imagen,
      e.privado, (SELECT COUNT(*) FROM Inscripcion WHERE id_evento = e.id) AS inscritos FROM Evento e
      INNER JOIN Categoria c ON e.id_categoria = C.id
      INNER JOIN Imagen i ON i.id_evento = e.id
      ${clausulaWhere} AND i.id_tipoImagen = 1
      ORDER BY e.fecha ASC
      OFFSET @desplazamiento ROWS
      FETCH NEXT @limite ROWS ONLY;
      `;

    let conteoConsulta = pool.request()
      .input("categoria", sql.VarChar, nombreCategoria);

    if (busqueda) {
      conteoConsulta.input("termino", sql.NVarChar, terminoLike);
    }

    const conteoResultado = await conteoConsulta.query(conteo);

    const totalEventos = conteoResultado.recordset[0].total;

    let consultaSolicitud = pool.request()
      .input("categoria", sql.VarChar, nombreCategoria)
      .input("desplazamiento", sql.Int, desplazamiento)
      .input("limite", sql.Int, limite_pagina);

    if (busqueda) {
      consultaSolicitud.input("termino", sql.NVarChar, terminoLike);
    }

    const resultado = await consultaSolicitud.query(consulta);

    res.status(200).json({
      eventos: resultado.recordset,
      totalEventos: totalEventos,
      eventosPorPagina: limite_pagina,
      paginaActual: paginaActual,
    });
  } catch (err) {
    console.error("Error en getEventosPorCategoria:", err.message);
    res.status(500).json({ mensaje: "Error al filtrar eventos por categoria" });
  }
};

export default getEventosPorCategoria;
