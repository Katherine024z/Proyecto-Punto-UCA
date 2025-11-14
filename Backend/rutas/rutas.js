import { Router } from 'express';
import getEventos from './eventosRuta.js';
import getEventosPorCategoria from './categoriaEventosRuta.js';
import getEventosDestacados from './eventosDestacado.js';

const rutas = Router();

rutas.get('/eventos', getEventos); 
rutas.get('/eventos/categoria/:nombreCategoria', getEventosPorCategoria);
rutas.get('/eventos/destacados',getEventosDestacados);

export default rutas;