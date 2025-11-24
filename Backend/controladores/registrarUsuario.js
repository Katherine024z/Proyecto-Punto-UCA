import { sql } from "../data/dbConfig.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { generateHash } from "../utilidades/hashes/hash.js";

const nombreArchivo = fileURLToPath(import.meta.url);
const rutaArchivo = path.dirname(nombreArchivo);

const registrarse = async (req, res) => {
  try {
    const { carnet, nombre, apellido, contrasena } = req.body;

    if (!carnet || !contrasena || !nombre || !apellido) {
      return res
        .status(400)
        .json({ mensaje: "Necesita llenar todos los campos" });
    }

    const rutaCarnets = path.join(rutaArchivo, "../data/carnetsValidos.json");
    const datosCarnets = fs.readFileSync(rutaCarnets, "utf-8");
    const carnetsPermitidos = JSON.parse(datosCarnets);

    if (!carnetsPermitidos.includes(carnet)) {
      return res
        .status(403)
        .json({ mensaje: "El carnet que ingreso no esta autorizado" });
    }

    const pool = req.db;

    const consultarCarnet = "SELECT * FROM Usuario where carnet = @carnet";
    const cuentaExistente = await pool
      .request()
      .input("carnet", sql.VarChar, carnet)
      .query(consultarCarnet);

    if (cuentaExistente.recordset.length > 0) {
      return res.status(409).json({
        mensaje: "Este carnet ya esta asociado a una cuenta dentro del sistema",
      });
    }

    const contraseñaHasheada = await generateHash(contrasena);

    const consultaInsertar = `
          INSERT INTO Usuario (carnet, nombre, apellido, contrasena, id_rol)
          VALUES (@carnet, @nombre, @apellido, @contrasena, 1)
          `;

    await pool
      .request()
      .input("carnet", sql.VarChar, carnet)
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("contrasena", sql.VarChar, contraseñaHasheada)
      .query(consultaInsertar);

    res
      .status(201)
      .json({ mensaje: "La cuenta de usuario se ha registrado exitosamente" });
  } catch (err) {
    console.error("Error en Registro de Usuario", err.message);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export default registrarse;