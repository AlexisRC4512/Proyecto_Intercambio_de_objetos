package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.Genero;
import pe.isil.proyectogrupo5.Model.Ubigeo;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return usuarioService.obtenerUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario obtenerUsuarioPorId(@PathVariable int id) {
        return usuarioService.obtenerUsuarioPorId(id);
    }

    @PostMapping
    public Usuario registrarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.registrarUsuario(usuario);
    }
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable int id, @RequestBody Usuario usuarioActualizado) {
        return usuarioService.actualizarUsuario(id, usuarioActualizado);
    }
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable int id) {
        usuarioService.eliminarUsuario(id);
    }

    @GetMapping("/generos")
    public List<Genero> obtenerGeneros() {
        return usuarioService.obtenerGeneros();
    }

    @GetMapping("/ubigeos")
    public List<Ubigeo> obtenerUbigeos() {
        return usuarioService.obtenerUbigeos();
    }

}