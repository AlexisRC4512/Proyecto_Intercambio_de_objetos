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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "publicacion")
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_publicacion")
    private Long id_publicacion;

    @Column(name = "id_categoria")
    private int id_categoria;

    @Column(name = "id_subcategoria")
    private int id_subcategoria;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fec_publicacion")
    private Date fec_publicacion;

    @Column(name = "id_estado")
    private int id_estado;

    @Column(name = "id_condicion")
    private int id_condicion;

    @Column(name = "id_usuario")
    private int id_usuario;

    @Column(name = "ano_fabricacion")
    private int ano_fabricacion;

    @ManyToOne
    @JoinColumn(name = "imagen")
    private Imagen imagen;


}