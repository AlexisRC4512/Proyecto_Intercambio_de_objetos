package pe.isil.proyectogrupo5.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;


@Entity
@Table(name = "oferta")
@Getter
@Setter
public class Oferta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oferta")
    private int idOferta;

    @ManyToOne
    @JoinColumn(name = "id_publicacion1")
    private Publicacion publicacion1;

    @ManyToOne
    @JoinColumn(name = "id_publicacion2")
    private Publicacion publicacion2;

    @Column(name = "fecha")
    private Timestamp fecha;

    @Column(name = "estado", length = 300)
    private int estado;

    public Oferta(Publicacion publicacion1, Publicacion publicacion2, Timestamp fecha, int estado) {
        this.publicacion1 = publicacion1;
        this.publicacion2 = publicacion2;
        this.fecha = fecha;
        this.estado = estado;
    }

    public Oferta() {}
}


