import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { sql } from "../data/dbConfig.js";
import { JWT_SECRET } from "../llaves/llaves.js";

const IniciarSesion = async (req, res) => {
  try {
    const { carnet, contrasena } = req.body;

    const pool = req.db;

    const consulta = "SELECT * FROM Usuario WHERE carnet = @carnet";

    const resultado = await pool
      .request()
      .input("carnet", sql.VarChar, carnet)
      .query(consulta);

    if (resultado.recordset.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuarioEncontrado = resultado.recordset[0];

    const esContrasenaValida = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.contrasena
    );

    if (!esContrasenaValida) {
      return res.status(401).json({ mensaje: "Contraseña invalida" });
    }

    const _jwt = jwt.sign(
      { carnet: usuarioEncontrado.carnet, rol: usuarioEncontrado.id_rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: _jwt,
      usuario: {
        carnet: usuarioEncontrado.carnet,
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido
      },
    });
  } catch (err) {
    console.error("Error en Iniciar Sesion", err.message);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export default IniciarSesion;