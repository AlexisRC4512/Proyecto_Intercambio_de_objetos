package pe.isil.proyectogrupo5.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuario_admin")
public class UsuarioAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario_admin")
    private int idUsuarioAdmin;

    @Column(name = "username")
    private String username;

    @Column(name = "nombres")
    private String nombres;

    @Column(name = "apellidos")
    private String apellidos;

    @Column(name = "contrasena")
    private String contrasena;

    @Column(name = "fec_registro")
    private LocalDateTime fechaRegistro;

    @Column(name = "id_genero")
    private int idGenero;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "email")
    private String email;
}