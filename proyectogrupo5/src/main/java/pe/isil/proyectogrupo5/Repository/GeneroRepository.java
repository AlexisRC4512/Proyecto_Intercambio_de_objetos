package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Genero;

@Repository
public interface GeneroRepository extends JpaRepository<Genero, Integer> {
}