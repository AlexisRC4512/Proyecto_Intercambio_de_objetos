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
import pe.isil.proyectogrupo5.Repository.UsuariotemporalRepository;
import pe.isil.proyectogrupo5.Response.InicioSesionResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class Usuario_temporalService {
    @Autowired
    private UsuariotemporalRepository usuariotemporalRepository;
    @Autowired
    private JavaMailSender mail;
    @Autowired
    private GeneroRepository generoRepository;

    @Autowired
    private UbigeoRepository ubigeoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuarios_temporales> obtenerUsuarios_Temporales() {
        return usuariotemporalRepository.findAll();
    }

    public Usuarios_temporales obtenerUsuario_temporalPorId(int id) {
        return usuariotemporalRepository.findById(id).orElse(null);
    }

    public static int generateRandomNumber() {
        Random random = new Random();
        return random.nextInt(900000) + 100000;
    }
    public Usuarios_temporales registrarUsuarioTemporal(Usuarios_temporales usuarios_temporales) {
        try {
            if(usuarios_temporales == null || usuarios_temporales.getEmail() == null || usuarios_temporales.getEmail().isEmpty() || usuarios_temporales.getContrasena() == null || usuarios_temporales.getContrasena().isEmpty()) {
                return null;
            }

            Optional<Usuarios_temporales> usuarioExistente = Optional.ofNullable(usuariotemporalRepository.findByEmail(usuarios_temporales.getEmail()));
            if (usuarioExistente.isPresent()) {
                return null;
            }

            SimpleMailMessage email = new SimpleMailMessage();
            String contrasenaEncriptada = passwordEncoder.encode(usuarios_temporales.getContrasena());
            usuarios_temporales.setContrasena(contrasenaEncriptada);
            LocalDateTime fechaHoraActual = LocalDateTime.now();
            usuarios_temporales.setFechaRegistro(fechaHoraActual);
            int numRandom2=generateRandomNumber();
            email.setTo(usuarios_temporales.getEmail());
            email.setFrom("IntercambioDeObjetos4512@outlook.com");
            usuarios_temporales.setCodUnico(numRandom2);
            email.setText("Para verificar tu cuenta y pueda acceder tiene que usar este codigo:::"+numRandom2);
            email.setSubject("Prueba1");
            mail.send(email);
            return usuariotemporalRepository.save(usuarios_temporales);
        } catch (Exception e) {
            System.err.println("Error al registrar usuario: " + e.getMessage());
            return null;
        }
    }

    public Usuarios_temporales actualizarUsuarioTemporal(int id, Usuarios_temporales usuarioActualizado) {
        Usuarios_temporales usuarioExistente = usuariotemporalRepository.findById(id).orElse(null);
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
        usuarioExistente.setCodUnico(usuarioActualizado.getCodUnico());
        return usuariotemporalRepository.save(usuarioExistente);
    }
    public Usuarios_temporales obtenerUsuarioTemporalPorEmail(String email) {
        return usuariotemporalRepository.findByEmail(email);
    }
    public Usuarios_temporales obtenerUsuarioTemporalPorCod(int codigo){
        return usuariotemporalRepository.findByCodUnico(codigo);
    }
    public void eliminarUsuarioTemporal(int id) {
        usuariotemporalRepository.deleteById(id);
    }

    public List<Genero> obtenerGeneros() {
        return generoRepository.findAll();
    }

    public List<Ubigeo> obtenerUbigeos() {
        return ubigeoRepository.findAll();
    }

}
