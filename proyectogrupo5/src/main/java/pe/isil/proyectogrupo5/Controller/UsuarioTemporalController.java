package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.Genero;
import pe.isil.proyectogrupo5.Model.Ubigeo;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Model.Usuarios_temporales;
import pe.isil.proyectogrupo5.Service.UsuarioService;
import pe.isil.proyectogrupo5.Service.Usuario_temporalService;

import java.util.List;

@RestController
    @RequestMapping("/api/usuariosTemporales")
public class UsuarioTemporalController {
    @Autowired
    private Usuario_temporalService usuarioTemporalService;

    @GetMapping
    public List<Usuarios_temporales> obtenerUsuariosTemporales() {
        return usuarioTemporalService.obtenerUsuarios_Temporales();
    }

    @GetMapping("/{id}")
    public Usuarios_temporales obtenerUsuarioTemporalPorId(@PathVariable int id) {
        return usuarioTemporalService.obtenerUsuario_temporalPorId(id);
    }

    @PostMapping
    public Usuarios_temporales registrarUsuarioTemporal(@RequestBody Usuarios_temporales usuario) {
        return usuarioTemporalService.registrarUsuarioTemporal(usuario);
    }
    @PutMapping("/{id}")
    public Usuarios_temporales actualizarUsuarioTemporal(@PathVariable int id, @RequestBody Usuarios_temporales usuarioActualizado) {
        return usuarioTemporalService.actualizarUsuarioTemporal(id, usuarioActualizado);
    }
    @DeleteMapping("/{id}")
    public void eliminarUsuarioTemporal(@PathVariable int id) {
        usuarioTemporalService.eliminarUsuarioTemporal(id);
    }

    @GetMapping("/generos")
    public List<Genero> obtenerGeneros() {
        return usuarioTemporalService.obtenerGeneros();
    }

    @GetMapping("/ubigeos")
    public List<Ubigeo> obtenerUbigeos() {
        return usuarioTemporalService.obtenerUbigeos();
    }

}
