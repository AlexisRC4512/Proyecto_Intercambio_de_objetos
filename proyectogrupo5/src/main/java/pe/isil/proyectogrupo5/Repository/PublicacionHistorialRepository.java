package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.PublicacionHistorial;
@Repository
public interface PublicacionHistorialRepository extends JpaRepository<PublicacionHistorial, Integer> {
    // Aquí puedes agregar métodos personalizados para consultas específicas
}
