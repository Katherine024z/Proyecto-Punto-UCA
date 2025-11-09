import { sql } from '../db/dbConfig.js';

const getEventosPorCategoria = async (req, res) => {
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
    console.error("Error en getEventosPorCategoria:", err.message);
    res.status(500).json({ mensaje: "Error al filtrar eventos por categoria" });
  }
}

export default getEventosPorCategoria;