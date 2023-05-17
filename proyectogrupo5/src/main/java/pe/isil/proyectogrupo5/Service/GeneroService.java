package pe.isil.proyectogrupo5.Service;

import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.Genero;
import pe.isil.proyectogrupo5.Repository.GeneroRepository;

import java.util.List;

@Service
public class GeneroService {

    private final GeneroRepository generoRepository;

    public GeneroService(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    public List<Genero> getAllGeneros() {
        return generoRepository.findAll();
    }

    public Genero getGeneroById(int id) {
        return generoRepository.findById(id).orElse(null);
    }

    public Genero createGenero(Genero genero) {
        return generoRepository.save(genero);
    }

    public Genero updateGenero(int id, Genero genero) {
        if (generoRepository.existsById(id)) {
            genero.setIdGenero(id);
            return generoRepository.save(genero);
        } else {
            return null;
        }
    }

    public boolean deleteGenero(int id) {
        if (generoRepository.existsById(id)) {
            generoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}