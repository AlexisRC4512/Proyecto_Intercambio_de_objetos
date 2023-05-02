package pe.isil.proyectogrupo5.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_ubigeo")
public class Ubigeo {

    @Id
    @Column(name = "Id_Ubigeo")
    private String idUbigeo;

    @Column(name = "Departamento")
    private String departamento;

    @Column(name = "Provincia")
    private String provincia;

    @Column(name = "Distrito")
    private String distrito;

    public String getIdUbigeo() {
        return idUbigeo;
    }

    public void setIdUbigeo(String idUbigeo) {
        this.idUbigeo = idUbigeo;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }
}