package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Imagen;

import java.util.List;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {
    @Query("SELECT i.imagen1 FROM Imagen i WHERE i.publicacion.id_publicacion = :id_publicacion")
    List<String> findImageNamesByPublicacionId(@Param("id_publicacion") Long id_publicacion);

}