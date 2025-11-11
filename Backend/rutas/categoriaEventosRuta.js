import { sql } from '../db/dbConfig.js';

const getEventosPorCategoria = async (req, res) => {
  try {
    const { nombreCategoria } = req.params;

    const consulta = `
    SELECT e.nombre, e.fecha, c.categoria, i.URL AS imagen FROM Evento e
    INNER JOIN Categoria c ON e.id_categoria = C.id
		INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
    INNER JOIN Imagen i on i.id_evento = e.id
    WHERE c.categoria = @categoria and er.estado = 'Pendiente'
    ORDER BY e.fecha ASC`;
    
    const pool = req.db;
    const resultado = await pool
      .request()
      .input("categoria", sql.VarChar, nombreCategoria) 
      .query(consulta);
    res.json(resultado.recordset);
  } catch (err) {
    console.error("Error en getEventosPorCategoria:", err.message);
    res.status(500).json({ mensaje: "Error al filtrar eventos por categoria" });
  }
}

export default getEventosPorCategoria;