import { Router } from 'express';
import getEventos from './eventosRuta.js';
import categoriaEventoRuta from './categoriaEventosRuta.js'; 
import buscarEventos from './busquedaRuta.js';

const rutas = Router();

rutas.get('/eventos', getEventos); 
rutas.get('/eventos/categoria/:nombreCategoria', categoriaEventoRuta);
rutas.get('/eventos/buscar', buscarEventos);
export default rutas;