import { verifyToken } from "../utilidades/middleware/token.js";

import { Router } from 'express';
import getEventos from '../controladores/eventosRuta.js';
import getEventosPorCategoria from '../controladores/categoriaEventosRuta.js'; 
import getEventosDestacados from '../controladores/eventosDestacado.js';
import buscarEventos from '../controladores/busquedaRuta.js';
import IniciarSesion from "../controladores/iniciarSesion.js";

const rutas = Router();

rutas.get('/eventos', getEventos); 
rutas.get('/eventos/categoria/:nombreCategoria', getEventosPorCategoria);
rutas.get('/eventos/buscar', buscarEventos);
rutas.get('/eventos/destacados',getEventosDestacados);
rutas.post('/login', IniciarSesion);

export default rutas;