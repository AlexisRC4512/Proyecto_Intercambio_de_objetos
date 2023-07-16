package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Interfaces.OfertaPublicacion1;
import pe.isil.proyectogrupo5.Interfaces.OfertaPublicacion2;

import pe.isil.proyectogrupo5.Model.Oferta;
import pe.isil.proyectogrupo5.Model.Publicacion;
import pe.isil.proyectogrupo5.Repository.OfertaRepository;
import pe.isil.proyectogrupo5.Repository.PublicacionRepository;

import java.util.List;

@Service
public class OfertaService {
    @Autowired
    private  OfertaRepository ofertaRepository;

    @Autowired
    private PublicacionRepository publicacionRepository;

    public Oferta obtenerOfertaPorId(int idOferta) {
        return ofertaRepository.findById(idOferta)
                .orElseThrow(() -> new IllegalArgumentException("Oferta no encontrada con ID: " + idOferta));
    }
    public Oferta guardarOferta(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }
    public void eliminarOferta(int idOferta) {
        ofertaRepository.deleteById(idOferta);
    }

    public Oferta editarOferta(Oferta oferta) {
        if (!ofertaRepository.existsById(oferta.getIdOferta())) {
            throw new IllegalArgumentException("Oferta no encontrada con ID: " + oferta.getIdOferta());
        }
        return ofertaRepository.save(oferta);


    }

    public List<Oferta> obtenerTodasLasOfertas() {
        return ofertaRepository.findAll();
    }
    public List<Oferta> obtenerOfertasporIdPublicacion( int idPublicacion1, int idPublicacion2) {
        List<Oferta> ofertas = ofertaRepository.findAll();
        for (Oferta oferta : ofertas) {


            Publicacion publicacion1 = publicacionRepository.findById((long) idPublicacion1)
                    .orElseThrow(() -> new IllegalArgumentException("Publicación no encontrada con ID: " + idPublicacion1));

            Publicacion publicacion2 = publicacionRepository.findById((long) idPublicacion2)
                    .orElseThrow(() -> new IllegalArgumentException("Publicación no encontrada con ID: " + idPublicacion2));

            oferta.setPublicacion1(publicacion1);
            oferta.setPublicacion2(publicacion2);
        }

        return ofertas;
    }
    public List<OfertaPublicacion1> findByPublicacionIdUsuario1(int codigoUsuario) {
        return ofertaRepository.findByPublicacion1_CodigoUsuario(codigoUsuario);
    }
    public List<OfertaPublicacion2> findByPublicacionIdUsuario2(int codigoUsuario) {
        return ofertaRepository.findByPublicacion2_CodigoUsuario2(codigoUsuario);
    }
    public List<Oferta> findByPublicacionIdUsuario(int codigoUsuario) {
        return ofertaRepository.findByPublicacionIdUsuario(codigoUsuario);
    }

    public Oferta findByOfertaporId(int idOferta){
        return ofertaRepository.findByidOferta(idOferta);
    }
}