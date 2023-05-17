package pe.isil.proyectogrupo5.Service;

import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.Ubigeo;
import pe.isil.proyectogrupo5.Repository.UbigeoRepository;

import java.util.List;

@Service
public class UbigeoService {

    private final UbigeoRepository ubigeoRepository;

    public UbigeoService(UbigeoRepository ubigeoRepository) {
        this.ubigeoRepository = ubigeoRepository;
    }

    public List<Ubigeo> getAllUbigeos() {
        return ubigeoRepository.findAll();
    }

    public Ubigeo getUbigeoById(String id) {
        return ubigeoRepository.findById(id).orElse(null);
    }

    public Ubigeo createUbigeo(Ubigeo ubigeo) {
        return ubigeoRepository.save(ubigeo);
    }

    public Ubigeo updateUbigeo(String id, Ubigeo ubigeo) {
        if (ubigeoRepository.existsById(id)) {
            ubigeo.setIdUbigeo(id);
            return ubigeoRepository.save(ubigeo);
        } else {
            return null;
        }
    }

    public boolean deleteUbigeo(String id) {
        if (ubigeoRepository.existsById(id)) {
            ubigeoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}