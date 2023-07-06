package pe.isil.proyectogrupo5.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "imagen")
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_imagen")
    private Long id_imagen;

    @Column(name = "imagen1")
    private String imagen1;
    @ManyToOne
    @JoinColumn(name = "id_publicacion")
    private Publicacion publicacion;

}