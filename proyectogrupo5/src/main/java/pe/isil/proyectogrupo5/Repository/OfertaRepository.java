package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Interfaces.OfertaPublicacion1;
import pe.isil.proyectogrupo5.Interfaces.OfertaPublicacion2;
import pe.isil.proyectogrupo5.Model.Oferta;
import pe.isil.proyectogrupo5.Model.Publicacion;

import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Integer> {
    @Query("SELECT o.idOferta AS idOferta, o.publicacion1 AS publicacion1, o.fecha AS fecha, o.estado AS estado FROM Oferta o WHERE o.publicacion1.codigoUsuario = :codigoUsuario")
    List<OfertaPublicacion1> findByPublicacion1_CodigoUsuario(@Param("codigoUsuario") int codigoUsuario);

    @Query("SELECT o.idOferta AS idOferta, o.publicacion2 AS publicacion2, o.fecha AS fecha, o.estado AS estado FROM Oferta o WHERE o.publicacion2.codigoUsuario = :codigoUsuario")
    List<OfertaPublicacion2> findByPublicacion2_CodigoUsuario2(@Param("codigoUsuario") int codigoUsuario);

    @Query("SELECT o FROM Oferta o WHERE o.publicacion1.codigoUsuario = :codigoUsuario OR o.publicacion2.codigoUsuario = :codigoUsuario")
    List<Oferta> findByPublicacionIdUsuario(@Param("codigoUsuario") int codigoUsuario);

    Oferta findByidOferta(int idOferta);

}
