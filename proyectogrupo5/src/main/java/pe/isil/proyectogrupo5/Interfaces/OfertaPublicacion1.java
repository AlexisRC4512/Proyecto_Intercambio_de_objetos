package pe.isil.proyectogrupo5.Interfaces;

import pe.isil.proyectogrupo5.Model.Publicacion;

import java.sql.Timestamp;

public interface OfertaPublicacion1 {
    int getIdOferta();
    Publicacion getPublicacion1();
    Timestamp getFecha();
    int getEstado();
}