package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Response.ApiResponse;
import pe.isil.proyectogrupo5.Service.UsuarioService;
@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/iniciarSesion")
    public ResponseEntity<?> iniciarSesion(@RequestParam String email,@RequestParam String contrasena) {
        boolean inicioSesionCorrecto = usuarioService.iniciarSesion(email, contrasena);

        if(inicioSesionCorrecto) {

            return ResponseEntity.ok(new ApiResponse(true, "Inicio de sesión correcto"));
        } else {

            return ResponseEntity.badRequest().body(new ApiResponse(false, "El correo electrónico o la contraseña son incorrectos"));
        }
    }

}
