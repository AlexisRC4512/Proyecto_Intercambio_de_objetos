package pe.isil.proyectogrupo5.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pe.isil.proyectogrupo5.Model.Categoria;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "subcategoria")
public class Subcategoria {
    @Id
    @Column(name = "id_subcategoria")
    private int idSubcategoria;
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion", columnDefinition = "text")
    private String descripcion;
}
