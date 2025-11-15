import sql from 'mssql';

const config = {
    user: 'web_user', 
    password: 'XBd0P8793!_',
    
    server: 'localhost', 
    database: 'EventosDB',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 600000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let dbPool;

async function initializeDb() {
    try {
        dbPool = await sql.connect(config);
        console.log("Conexión a SQL Server establecida y pool creado.");
        return dbPool;
    } catch (err) {
        console.error("Error al conectar con SQL Server:", err.message);
        throw err; 
    }
}

export { sql, initializeDb, dbPool as getPool };
