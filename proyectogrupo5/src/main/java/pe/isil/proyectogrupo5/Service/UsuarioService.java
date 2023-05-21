package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.Genero;
import pe.isil.proyectogrupo5.Model.Ubigeo;
import pe.isil.proyectogrupo5.Model.Usuario;
import pe.isil.proyectogrupo5.Model.Usuarios_temporales;
import pe.isil.proyectogrupo5.Repository.GeneroRepository;
import pe.isil.proyectogrupo5.Repository.UbigeoRepository;
import pe.isil.proyectogrupo5.Repository.UsuarioRepository;
import pe.isil.proyectogrupo5.Repository.UsuariotemporalRepository;
import pe.isil.proyectogrupo5.Response.InicioSesionResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private JavaMailSender mail;
    @Autowired
    private GeneroRepository generoRepository;

    @Autowired
    private UbigeoRepository ubigeoRepository;
    @Autowired
    private  Usuario_temporalService usuarioTemporalService;
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario obtenerUsuarioPorId(int id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario registrarUsuario(int numeroVerificacion) {

      Usuarios_temporales usuarios_temporales= usuarioTemporalService.obtenerUsuarioTemporalPorCod(numeroVerificacion);
      Usuario usuario=new Usuario<>();
        if (usuarios_temporales!=null){
            usuario.setContrasena(usuarios_temporales.getContrasena());
            usuario.setApellidos(usuarios_temporales.getApellidos());
            usuario.setEmail(usuarios_temporales.getEmail());
            usuario.setGenero(usuarios_temporales.getGenero());
            usuario.setNombres(usuarios_temporales.getNombres());
            usuario.setUbigeo(usuarios_temporales.getUbigeo());
            usuario.setFechaRegistro(usuarios_temporales.getFechaRegistro());
            usuario.setEstado(1);
            usuario.setDireccion1(usuarios_temporales.getDireccion1());
            usuario.setDireccion2(usuarios_temporales.getDireccion2());
            usuario.setFechaNacimiento(usuarios_temporales.getFechaNacimiento());
            usuario.setTelefono(usuarios_temporales.getTelefono());
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(int id, Usuario usuarioActualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id).orElse(null);
        if (usuarioExistente == null) {
            return null;
        }
        usuarioExistente.setNombres(usuarioActualizado.getNombres());
        usuarioExistente.setApellidos(usuarioActualizado.getApellidos());
        usuarioExistente.setContrasena(usuarioActualizado.getContrasena());
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
    public InicioSesionResponse iniciarSesion(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) {
            return new InicioSesionResponse(false, "El usuario no existe");
        }

        boolean passwordMatch = passwordEncoder.matches(password, usuario.getContrasena());
        if (passwordMatch) {
            return new InicioSesionResponse(true, "Inicio de Sesion correcto");
        }

        return new InicioSesionResponse(false, "La contraseña es incorrecta");
    }
    public Usuario RecuperarContraseña(String email2) {

        Usuario usuario = usuarioRepository.findByEmail(email2);

        if (usuario!=null){
            SimpleMailMessage email = new SimpleMailMessage();
            String contrasenaEncriptada = passwordEncoder.encode(usuario.getContrasena());
            email.setTo(usuario.getEmail());
            email.setFrom("truequeapp4512@gmail.com");
            email.setText("Tu contraseña es :::"+usuario.getContrasena());
            email.setSubject("Recuperacion de contraseña");
            mail.send(email);
        }
        return usuario;
    }

    public Usuario CambiarDeContraseña(String email2,String Nuevacontraseña){
        Usuario usuario = usuarioRepository.findByEmail(email2);

        if (usuario!=null){
           usuario.setContrasena(Nuevacontraseña);
        }
        return usuarioRepository.save(usuario);
    }
}
