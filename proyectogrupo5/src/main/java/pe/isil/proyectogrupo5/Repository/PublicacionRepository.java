package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Publicacion;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    @EntityGraph(attributePaths = {"imagen", "id_categoria", "id_subcategoria"})
    List<Publicacion> findAll();

}
