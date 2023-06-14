package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Imagen;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {
}