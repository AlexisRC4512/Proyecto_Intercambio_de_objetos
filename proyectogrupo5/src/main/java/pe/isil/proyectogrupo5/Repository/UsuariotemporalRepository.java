package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Model.Usuarios_temporales;
@Repository
public interface UsuariotemporalRepository extends JpaRepository<Usuarios_temporales,Integer> {
    Usuarios_temporales findByEmail(String email);
    Usuarios_temporales findByCodUnico(int codUnico);
}
