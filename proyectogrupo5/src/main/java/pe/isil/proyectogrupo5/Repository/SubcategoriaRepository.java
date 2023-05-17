package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Subcategoria;

@Repository
public interface SubcategoriaRepository extends JpaRepository<Subcategoria,Integer> {

}
