package pe.isil.proyectogrupo5.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "publicacion_historial")
public class PublicacionHistorial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_publicacion_historial")
    private Integer idPublicacionHistorial;

    @Column(name = "id_publicacion")
    private Integer idPublicacion;

    @Column(name = "id_categoria")
    private Integer idCategoria;

    @Column(name = "id_subcategoria")
    private Integer idSubcategoria;

    private String titulo;
    private String descripcion;

    @Column(name = "fec_publicacion")
    private Date fecPublicacion;

    @Column(name = "id_estado")
    private Integer idEstado;

    @Column(name = "id_condicion")
    private Integer idCondicion;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "ano_fabricacion")
    private Integer anoFabricacion;


    @Column(name = "fec_registro")
    private Date fecRegistro;


    public PublicacionHistorial(Integer idPublicacion, Integer idCategoria, Integer idSubcategoria, String titulo,
                                String descripcion, Date fecPublicacion, Integer idEstado, Integer idCondicion, Integer idUsuario,
                                Integer anoFabricacion, Date fecRegistro) {
        this.idPublicacion = idPublicacion;
        this.idCategoria = idCategoria;
        this.idSubcategoria = idSubcategoria;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecPublicacion = fecPublicacion;
        this.idEstado = idEstado;
        this.idCondicion = idCondicion;
        this.idUsuario = idUsuario;
        this.anoFabricacion = anoFabricacion;
        this.fecRegistro = fecRegistro;
    }
    public PublicacionHistorial() {}
}