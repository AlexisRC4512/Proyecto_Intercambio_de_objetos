package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.UsuarioAdmin;
import pe.isil.proyectogrupo5.Service.UsuarioAdminService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuariosadmin")
public class UsuarioAdminController {
    private final UsuarioAdminService usuarioAdminService;

    @Autowired
    public UsuarioAdminController(UsuarioAdminService usuarioAdminService) {
        this.usuarioAdminService = usuarioAdminService;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioAdmin>> getAllUsuariosAdmin() {
        List<UsuarioAdmin> usuariosAdmin = usuarioAdminService.getAllUsuariosAdmin();
        return new ResponseEntity<>(usuariosAdmin, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioAdmin> getUsuarioAdminById(@PathVariable int id) {
        Optional<UsuarioAdmin> usuarioAdmin = usuarioAdminService.getUsuarioAdminById(id);
        return usuarioAdmin.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public UsuarioAdmin registrarUsuarioAdmin(@RequestBody UsuarioAdmin usuario) {
        return usuarioAdminService.registrarUsuario(usuario);
    }
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioAdmin> updateUsuarioAdmin(@PathVariable int id, @RequestBody UsuarioAdmin usuarioAdmin) {
        Optional<UsuarioAdmin> existingUsuarioAdmin = usuarioAdminService.getUsuarioAdminById(id);
        if (existingUsuarioAdmin.isPresent()) {
            usuarioAdmin.setIdUsuarioAdmin(id);
            UsuarioAdmin updatedUsuarioAdmin = usuarioAdminService.saveUsuarioAdmin(usuarioAdmin);
            return new ResponseEntity<>(updatedUsuarioAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuarioAdmin(@PathVariable int id) {
        usuarioAdminService.deleteUsuarioAdmin(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/byEmail/{email}")
    public ResponseEntity<UsuarioAdmin> findUsuarioAdminByEmail(@PathVariable String email) {
        UsuarioAdmin usuarioAdmin = usuarioAdminService.findUsuarioAdminByEmail(email);
        if (usuarioAdmin != null) {
            return new ResponseEntity<>(usuarioAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
