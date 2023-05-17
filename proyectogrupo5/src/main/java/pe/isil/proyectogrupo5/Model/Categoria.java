package pe.isil.proyectogrupo5.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categoria")
public class Categoria {
    @Id
    @SequenceGenerator(name = "my_sequence", sequenceName = "my_sequence", allocationSize = 1)
    @Column(name = "id_categoria")
    private int id_categoria;

    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "nombre")
    private String nombre;
}
