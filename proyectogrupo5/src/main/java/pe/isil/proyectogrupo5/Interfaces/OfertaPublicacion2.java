package pe.isil.proyectogrupo5.Interfaces;

import pe.isil.proyectogrupo5.Model.Publicacion;

import java.sql.Timestamp;

public interface OfertaPublicacion2 {
    int getIdOferta();
    Publicacion getPublicacion2();
    Timestamp getFecha();
    int getEstado();
}
