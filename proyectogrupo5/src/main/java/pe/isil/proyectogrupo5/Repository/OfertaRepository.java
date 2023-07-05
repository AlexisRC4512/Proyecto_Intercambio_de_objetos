package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Oferta;
import pe.isil.proyectogrupo5.Model.Publicacion;

import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Integer> {

}
