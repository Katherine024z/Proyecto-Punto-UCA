import React from 'react';
import '../styles/layout.css'

const TotalEventosContador = ({ conteo, categoria }) => {
    return (
        <h6 className="conteo-eventos">
            <b>{conteo}</b>&nbsp;evento(s) disponibles.
        </h6>
    );
};

export default TotalEventosContador;