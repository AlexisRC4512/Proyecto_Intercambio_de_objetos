package pe.isil.proyectogrupo5.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Model.UsuarioAdmin;

@Repository
public interface UsuarioAdminRepository extends JpaRepository<UsuarioAdmin,Integer> {
    UsuarioAdmin findByEmail(String email);
}
