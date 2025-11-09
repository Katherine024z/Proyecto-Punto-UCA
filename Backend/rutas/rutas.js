import { Router } from 'express';
import eventosRuta from './eventosRuta.js';
import categoriaEventoRuta from './categoriaEventosRuta.js'; 

const rutas = Router();

rutas.get('/eventos', eventosRuta); 
rutas.get('/eventos/categoria/:nombreCategoria', categoriaEventoRuta);

export default rutas;