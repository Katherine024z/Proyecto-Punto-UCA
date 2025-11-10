import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginacionEventos = ({ pagActual, pagTotal, cambiarPag }) => {
    
    if (pagTotal <= 1) {
        return null;
    }
    return (
        <Pagination>
            <PaginationItem  className = "pag-anterior" disabled={pagActual === 1}>
                <PaginationLink 
                    previous 
                    onClick={() => cambiarPag(pagActual - 1)} 
                />
            </PaginationItem>
            {[...Array(pagTotal)].map((_, i) => (
                <PaginationItem className = "array-num" key={i} active={i + 1 === pagActual}>
                    <PaginationLink onClick={() => cambiarPag(i + 1)}>
                        {i + 1}
                    </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem className = "pag-siguiente" disabled={pagActual === pagTotal}>
                <PaginationLink 
                    next 
                    onClick={() => cambiarPag(pagActual + 1)} 
                />
            </PaginationItem>
        </Pagination>
    );
};

export default PaginacionEventos;