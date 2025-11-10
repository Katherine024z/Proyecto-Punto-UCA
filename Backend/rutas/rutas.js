import { Router } from 'express';
import getEventos from './eventosRuta.js';
import categoriaEventoRuta from './categoriaEventosRuta.js'; 

const rutas = Router();

rutas.get('/eventos', getEventos); 
rutas.get('/eventos/categoria/:nombreCategoria', categoriaEventoRuta);

export default rutas;