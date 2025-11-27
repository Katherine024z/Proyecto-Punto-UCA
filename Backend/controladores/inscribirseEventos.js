import { sql } from "../data/dbConfig.js";

const InscribirseEvento = async (req, res) => {
  try{
  const { id_evento } = req.body;

  const {carnet} = req.user;

  if(!id_evento) {
    return res.status(400).json({mensaje: "ID de evento no proporcionado"})
  }

  const pool = req.db;

  const consultaEvento = "SELECT nombre, cupos, privado FROM EVENTO WHERE id = @id_evento";

  const resultadoEvento = await pool.request()
    .input("id_evento", sql.Int, id_evento)
    .query(consultaEvento);

  if(resultadoEvento.recordset.length === 0){
    return res.status(404).json({mensaje: "El evento no existe"});
  }

  const evento = resultadoEvento.recordset[0];
  const cuposMaximos = evento.cupos;

  const consultaUsuarioInscrito = "SELECT id FROM Inscripcion WHERE id_evento = @id_evento AND id_usuario = @carnet";
  const resultadoUsuarioInscrito = await pool.request()
    .input("id_evento", sql.Int, id_evento)
    .input("carnet", sql.VarChar, carnet)
    .query(consultaUsuarioInscrito);

  if (resultadoUsuarioInscrito.recordset.length > 0){
    return res.status(409).json({mensaje: "Ya estas suscrito a este evento"});
  }

  if(cuposMaximos > 0){
    const consultaCuposTotal = "SELECT COUNT(*) as total FROM Inscripcion WHERE id_evento = @id_evento";
    const resultadoCuposTotal = await pool.request()
      .input("id_evento", sql.Int, id_evento)
      .query(consultaCuposTotal);

      const inscritosActuales = resultadoCuposTotal.recordset[0].total;

      if(inscritosActuales >= cuposMaximos){
        return res.status(409).json({mensaje: "Los cupos estan llenos para este evento"});
      }
  }

  const insertarInscripcion = `
  INSERT INTO Inscripcion (id_evento, id_usuario)
  VALUES (@id_evento, @carnet)
  `;

  await pool.request()
    .input("id_evento", sql.Int, id_evento)
    .input("carnet", sql.VarChar, carnet)
    .query(insertarInscripcion);

  res.status(201).json({mensaje: `inscripcion exitosa al evento: ${evento.nombre}`})
  }catch (err){
    console.error("Error en inscripcion: ", err.message);
    res.status(500).json({mensaje: "Error en el servidor al realizar la inscripcion"})
  }
};

export default InscribirseEvento;