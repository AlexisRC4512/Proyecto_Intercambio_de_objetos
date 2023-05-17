package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Response.ApiResponse;
import pe.isil.proyectogrupo5.Response.InicioSesionResponse;
import pe.isil.proyectogrupo5.Service.UsuarioAdminService;
import pe.isil.proyectogrupo5.Service.UsuarioService;
@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private UsuarioAdminService usuarioAdminService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/iniciarSesionAdmin")
    public ResponseEntity<InicioSesionResponse> iniciarSesionAdmin(@RequestParam String email, @RequestParam String contrasena) {
        InicioSesionResponse inicioSesionResponse = usuarioAdminService.iniciarSesionAdmin(email, contrasena);
        if (inicioSesionResponse.isSuccess()) {
            return ResponseEntity.ok().body(inicioSesionResponse);
        } else {
            return ResponseEntity.badRequest().body(inicioSesionResponse);
        }
    }
    @PostMapping("/iniciarSesion")
    public ResponseEntity<InicioSesionResponse> iniciarSesion(@RequestParam String email, @RequestParam String contrasena) {
        InicioSesionResponse inicioSesionResponse = usuarioService.iniciarSesion(email, contrasena);
        if (inicioSesionResponse.isSuccess()) {
            return ResponseEntity.ok().body(inicioSesionResponse);
        } else {
            return ResponseEntity.badRequest().body(inicioSesionResponse);
        }
    }
    @PutMapping("/CambiarContraseña")
    public Usuario CambiarContraseña(@RequestParam String Email, @RequestParam String Contraseña) {
        return usuarioService.CambiarDeContraseña(Email,Contraseña);
    }
    @GetMapping("/EnviarContraseña")
    public Usuario EnviarContraseña(@RequestParam String Email) {
        return usuarioService.RecuperarContraseña(Email);
    }

}
