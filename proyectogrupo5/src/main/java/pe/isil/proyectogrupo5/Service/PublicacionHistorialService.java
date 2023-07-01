package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.PublicacionHistorial;
import pe.isil.proyectogrupo5.Repository.PublicacionHistorialRepository;

import java.util.List;

@Service
public class PublicacionHistorialService {
    private final PublicacionHistorialRepository publicacionHistorialRepository;

    @Autowired
    public PublicacionHistorialService(PublicacionHistorialRepository publicacionHistorialRepository) {
        this.publicacionHistorialRepository = publicacionHistorialRepository;
    }

    public List<PublicacionHistorial> getAllPublicacionesHistorial() {
        return publicacionHistorialRepository.findAll();
    }

    public void savePublicacionHistorial(PublicacionHistorial publicacionHistorial) {
        publicacionHistorialRepository.save(publicacionHistorial);
    }


}