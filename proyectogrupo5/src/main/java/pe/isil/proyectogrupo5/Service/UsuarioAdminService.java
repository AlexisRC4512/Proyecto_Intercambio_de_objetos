package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.*;
import pe.isil.proyectogrupo5.Repository.GeneroRepository;
import pe.isil.proyectogrupo5.Repository.UbigeoRepository;
import pe.isil.proyectogrupo5.Repository.UsuarioAdminRepository;
import pe.isil.proyectogrupo5.Repository.UsuarioRepository;
import pe.isil.proyectogrupo5.Response.InicioSesionResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioAdminService {
    private final UsuarioAdminRepository usuarioAdminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mail;
    @Autowired
    private GeneroRepository generoRepository;

    @Autowired
    private UbigeoRepository ubigeoRepository;
    @Autowired
    public UsuarioAdminService(UsuarioAdminRepository usuarioAdminRepository) {
        this.usuarioAdminRepository = usuarioAdminRepository;
    }

    public List<UsuarioAdmin> getAllUsuariosAdmin() {
        return usuarioAdminRepository.findAll();
    }

    public Optional<UsuarioAdmin> getUsuarioAdminById(int id) {
        return usuarioAdminRepository.findById(id);
    }

    public UsuarioAdmin saveUsuarioAdmin(UsuarioAdmin usuarioAdmin) {
        return usuarioAdminRepository.save(usuarioAdmin);
    }

    public void deleteUsuarioAdmin(int id) {
        usuarioAdminRepository.deleteById(id);
    }

    public UsuarioAdmin findUsuarioAdminByEmail(String email) {
        return usuarioAdminRepository.findByEmail(email);
    }

    public UsuarioAdmin obtenerUsuario_AdministracionPorEmail(String email) {
        return usuarioAdminRepository.findByEmail(email);
    }
    public void eliminarUsuario(int id) {
        usuarioAdminRepository.deleteById(id);
    }


    public InicioSesionResponse iniciarSesionAdmin(String email, String password) {
        UsuarioAdmin usuario = usuarioAdminRepository.findByEmail(email);

        if (usuario == null) {
            return new InicioSesionResponse(false, "El usuario no existe");
        }

        boolean passwordMatch = passwordEncoder.matches(password, usuario.getContrasena());
        if (passwordMatch) {
            return new InicioSesionResponse(true, "Inicio de Sesion correcto");
        }

        return new InicioSesionResponse(false, "La contraseña es incorrecta");
    }
    public UsuarioAdmin RecuperarContraseña(String email2) {

        UsuarioAdmin usuario = usuarioAdminRepository.findByEmail(email2);

        if (usuario!=null){
            SimpleMailMessage email = new SimpleMailMessage();
            String contrasenaEncriptada = passwordEncoder.encode(usuario.getContrasena());
            email.setTo(usuario.getEmail());
            email.setFrom("IntercambioDeObjetos4512@outlook.com");
            email.setText("Tu contraseña es :::"+usuario.getContrasena());
            email.setSubject("Recuperacion de contraseña");
            mail.send(email);
        }
        return usuario;
    }

    public UsuarioAdmin CambiarDeContraseña(String email2,String Nuevacontraseña){
        UsuarioAdmin usuario = usuarioAdminRepository.findByEmail(email2);

        if (usuario!=null){
            usuario.setContrasena(Nuevacontraseña);
        }
        return usuarioAdminRepository.save(usuario);
    }
    public UsuarioAdmin registrarUsuario(UsuarioAdmin usuario) {
        try {
            if(usuario == null || usuario.getEmail() == null || usuario.getEmail().isEmpty() || usuario.getContrasena() == null || usuario.getContrasena().isEmpty()) {
                return null;
            }

            Optional<UsuarioAdmin> usuarioExistente = Optional.ofNullable(usuarioAdminRepository.findByEmail(usuario.getEmail()));
            if (usuarioExistente.isPresent()) {
                return null;
            }
            SimpleMailMessage email = new SimpleMailMessage();
            String contrasenaEncriptada = passwordEncoder.encode(usuario.getContrasena());
            usuario.setContrasena(contrasenaEncriptada);
            LocalDateTime fechaHoraActual = LocalDateTime.now();
            usuario.setFechaRegistro(fechaHoraActual);
            email.setTo(usuario.getEmail());
            email.setFrom("IntercambioDeObjetos4512@outlook.com");
            email.setText("Usted se Registro su usuario es ::"+usuario.getEmail()+" y su contraseña es ::"+usuario.getContrasena());
            email.setSubject("Registro web IntercambioDeObjetos administrador");
            mail.send(email);
            return usuarioAdminRepository.save(usuario);
        } catch (Exception e) {
            System.err.println("Error al registrar usuario: " + e.getMessage());
            return null;
        }
    }
}