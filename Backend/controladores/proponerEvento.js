import { sql } from "../data/dbConfig.js";

const ProponerEvento = async (req, res) => {
  try {
    const {
      nombre,
      encargado,
      fecha,
      descripcion,
      duracion,
      id_categoria,
      urlImagenTarjeta,
      urlImagenHeader,
      privado,
      cupos
    } = req.body;

    const pool = req.db;

    const insertarEvento = `
      INSERT INTO EVENTO (nombre, encargado, fecha, descripcion, duracion,
      id_categoria, id_estadoAprobacion, id_estadoRealizacion, destacado, 
      privado, cupos)
      VALUES (@nombre, @encargado, @fecha, @descripcion, @duracion, 
      @id_categoria, 1, 1, 0, @privado, @cupos);
      SELECT SCOPE_IDENTITY() AS id;
    `;

    const resultadoEvento = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("encargado", sql.VarChar, encargado)
      .input("fecha", sql.Date, fecha)
      .input("descripcion", sql.Text, descripcion)
      .input("duracion", sql.Int, duracion)
      .input("id_categoria", sql.Int, id_categoria)
      .input("privado", sql.Bit, privado)
      .input("cupos", sql.Int, cupos)
      .query(insertarEvento);

    const eventoId = resultadoEvento.recordset[0].id;

    const insertarImagen = `
    INSERT INTO IMAGEN (URL, id_evento, id_tipoImagen)
    VALUES(@url, @id_evento, @id_tipoImagen);
    `

    await pool.request()
      .input("url", sql.VarChar, urlImagenTarjeta)
      .input("id_evento", sql.Int, eventoId)
      .input("id_tipoImagen", sql.Int, 1)
      .query(insertarImagen);

    await pool.request()
      .input("url", sql.VarChar, urlImagenHeader)
      .input("id_evento", sql.Int, eventoId)
      .input("id_tipoImagen", sql.Int, 2)
      .query(insertarImagen);

    res.status(201).json({ mensaje: "Evento guardado exitosamente" });

  } catch (err){
    console.error("Error al crear evento:", err.message);
    res.status(500).json({ mensaje: "Error en el servidor al crear al evento"});
  }
};

export default ProponerEvento;