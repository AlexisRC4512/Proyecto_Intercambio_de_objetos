package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.Genero;
import pe.isil.proyectogrupo5.Model.Ubigeo;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Repository.GeneroRepository;
import pe.isil.proyectogrupo5.Repository.UbigeoRepository;
import pe.isil.proyectogrupo5.Repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JavaMailSender mail;
    @Autowired
    private GeneroRepository generoRepository;

    @Autowired
    private UbigeoRepository ubigeoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario obtenerUsuarioPorId(int id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario registrarUsuario(Usuario usuario) {
        try {
            if(usuario == null || usuario.getEmail() == null || usuario.getEmail().isEmpty() || usuario.getContrasena() == null || usuario.getContrasena().isEmpty()) {
                return null;
            }

            Optional<Usuario> usuarioExistente = Optional.ofNullable(usuarioRepository.findByEmail(usuario.getEmail()));
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
            email.setText("Mensaje de prueba 1");
            email.setSubject("Prueba1");
            mail.send(email);
            return usuarioRepository.save(usuario);
        } catch (Exception e) {
            System.err.println("Error al registrar usuario: " + e.getMessage());
            return null;
        }
    }

    public Usuario actualizarUsuario(int id, Usuario usuarioActualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id).orElse(null);
        if (usuarioExistente == null) {
            return null;
        }
        usuarioExistente.setNombres(usuarioActualizado.getNombres());
        usuarioExistente.setApellidos(usuarioActualizado.getApellidos());
        usuarioExistente.setContrasena(passwordEncoder.encode(usuarioActualizado.getContrasena()));
        usuarioExistente.setEmail(usuarioActualizado.getEmail());
        usuarioExistente.setFechaNacimiento(usuarioActualizado.getFechaNacimiento());
        usuarioExistente.setGenero(usuarioActualizado.getGenero());
        usuarioExistente.setUbigeo(usuarioActualizado.getUbigeo());
        return usuarioRepository.save(usuarioExistente);
    }
    public Usuario obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    public void eliminarUsuario(int id) {
        usuarioRepository.deleteById(id);
    }

    public List<Genero> obtenerGeneros() {
        return generoRepository.findAll();
    }

    public List<Ubigeo> obtenerUbigeos() {
        return ubigeoRepository.findAll();
    }
    public Boolean iniciarSesion(String email ,String password){
        Usuario usuario = usuarioRepository.findByEmail(email);

        if(usuario == null) {
            return false;
        }
        boolean passwordMatch = passwordEncoder.matches(password, usuario.getContrasena());
        if(passwordMatch) {
            return true;
        }

        return false;
    }
}
