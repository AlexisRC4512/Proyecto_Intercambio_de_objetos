package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Categoria;
import pe.isil.proyectogrupo5.Model.Subcategoria;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubcategoriaRepository extends JpaRepository<Subcategoria,Integer> {
    List<Subcategoria> findByCategoria(Optional<Categoria> categoria);

}
