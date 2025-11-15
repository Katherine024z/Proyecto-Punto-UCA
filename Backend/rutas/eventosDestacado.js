const getEventosDestacados = async (req, res) => {
  try {
    const pool = req.db;

    const consulta = `
            SELECT e.id, e.nombre, i.URL AS imagen
            FROM Evento e
            INNER JOIN Imagen i ON i.id_evento = e.id
            WHERE e.destacado = 1 AND e.id_estadoRealizacion=1 AND e.id_estadoAprobacion=2 AND i.id_tipoImagen = 2
            ORDER BY e.fecha ASC;
        `;

    const resultado = await pool.request().query(consulta);

    res.status(200).json(resultado.recordset);
  } catch (err) {
    console.error("Error en getEventosDestacados:", err.message);
    res.status(500).json({ mensaje: "Error al obtener eventos destacados" });
  }
};

export default getEventosDestacados;
