
const getEventos = async (req, res) => {
    try{
        const pool = req.db;
        const resultado = await pool.request().query(`
            SELECT e.nombre, e.fecha, c.categoria, i.URL AS imagen
            FROM Evento e
            INNER JOIN Categoria c ON e.id_categoria = c.id
			INNER JOIN EstadoRealizacion er ON e.id_estadoRealizacion = er.id
            INNER JOIN Imagen i on i.id_evento = e.id
			WHERE er.estado = 'Pendiente'
            ORDER BY e.fecha ASC;
        `);
        res.status(200).json(resultado.recordset);
    } catch (err) {
        console.error("Error en getEventos:", err.message);
        res.status(500).json({
            message: 'Error al obtener lista de eventos.',
            error: err.message
        });
    }
}

export default getEventos;