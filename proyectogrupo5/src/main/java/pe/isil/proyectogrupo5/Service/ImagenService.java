package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.Imagen;
import pe.isil.proyectogrupo5.Repository.ImagenRepository;

import java.util.List;

@Service
public class ImagenService {
    @Autowired
    private ImagenRepository imagenRepository;

    public Imagen save(Imagen imagen) {
        imagenRepository.save(imagen);
        return imagen;
    }

    public List<Imagen> findAll() {
        return imagenRepository.findAll();
    }

    public Imagen findById(Long id) {
        return imagenRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        imagenRepository.deleteById(id);
    }
}