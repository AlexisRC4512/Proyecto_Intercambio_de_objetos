package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.Publicacion;
import pe.isil.proyectogrupo5.Repository.PublicacionRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class PublicacionService {
    @Autowired
    private PublicacionRepository publicacionRepository;

    public Publicacion save(Publicacion publicacion) {
        publicacionRepository.save(publicacion);
        return publicacion;
    }
    public List<Publicacion> findAll() {
        return publicacionRepository.findAll();
    }

    public Publicacion findById(Long id) {
        return publicacionRepository.findById(id).orElse(null);
    }


    public List<Publicacion> findBycodigoUsuario(int idUsuario) {
        return publicacionRepository.findBycodigoUsuario(idUsuario);
    }



    public void deleteById(Long id) {
        publicacionRepository.deleteById(id);
    }
}