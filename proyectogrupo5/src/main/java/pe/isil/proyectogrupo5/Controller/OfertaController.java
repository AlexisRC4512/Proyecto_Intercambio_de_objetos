package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Interfaces.OfertaPublicacion1;
import pe.isil.proyectogrupo5.Interfaces.OfertaPublicacion2;
import pe.isil.proyectogrupo5.Model.Oferta;
import pe.isil.proyectogrupo5.Service.OfertaService;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
public class OfertaController {
    @Autowired
    private  OfertaService ofertaService;

    @GetMapping
    public ResponseEntity<List<Oferta>> obtenerTodasLasOfertas() {
        List<Oferta> ofertas = ofertaService.obtenerTodasLasOfertas();
        return new ResponseEntity<>(ofertas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oferta> obtenerOfertaPorId(@PathVariable("id") int idOferta) {
        Oferta oferta = ofertaService.obtenerOfertaPorId(idOferta);
        return new ResponseEntity<>(oferta, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Oferta> crearOferta(@RequestBody Oferta oferta) {
        java.util.Date fechaActual = new java.util.Date();

        Timestamp timestamp = new Timestamp(fechaActual.getTime());

        oferta.setFecha(timestamp);
        oferta.setEstado(1);
        Oferta nuevaOferta = ofertaService.guardarOferta(oferta);
        return new ResponseEntity<>(nuevaOferta, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Oferta> editarOferta(@PathVariable("id") int idOferta, @RequestBody Oferta oferta) {
        oferta.setIdOferta(idOferta);
        Oferta ofertaActualizada = ofertaService.editarOferta(oferta);
        return new ResponseEntity<>(ofertaActualizada, HttpStatus.OK);
    }
    @PutMapping("editarOfertaEstado/{id}")
    public Oferta editarOfertaEstado(@PathVariable("id") int idOferta, @RequestParam int estado) {
       Oferta ofertaActualizada = ofertaService.findByOfertaporId(idOferta);
        ofertaActualizada.setEstado(estado);
        return ofertaActualizada;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOferta(@PathVariable("id") int idOferta) {
        ofertaService.eliminarOferta(idOferta);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/OfertaPublicacion")
    public ResponseEntity<List<Oferta>> obtenerOfertasPorIdPublicacion(@RequestParam("idPublicacion1") int idPublicacion1,
                                                                       @RequestParam("idPublicacion2") int idPublicacion2) {
        List<Oferta> ofertas = ofertaService.obtenerOfertasporIdPublicacion(idPublicacion1, idPublicacion2);
        return new ResponseEntity<>(ofertas, HttpStatus.OK);
    }
    @GetMapping("/ofertas/usuario1/{codigoUsuario}")
    public ResponseEntity<List<OfertaPublicacion1>> getOfertasByPublicacionIdUsuario1(@PathVariable int codigoUsuario) {
        List<OfertaPublicacion1> ofertas = ofertaService.findByPublicacionIdUsuario1(codigoUsuario);
        return ResponseEntity.ok(ofertas);
    }
    @GetMapping("/ofertas/usuario2/{codigoUsuario}")
    public ResponseEntity<List<OfertaPublicacion2>> getOfertasByPublicacionIdUsuario2(@PathVariable int codigoUsuario) {
        List<OfertaPublicacion2> ofertas = ofertaService.findByPublicacionIdUsuario2(codigoUsuario);
        return ResponseEntity.ok(ofertas);
    }
    @GetMapping("/ofertas/codigoUsuario/{codigoUsuario}")
    public ResponseEntity<List<Oferta>> getOfertasByPublicacionCodigo(@PathVariable int codigoUsuario) {
        List<Oferta> ofertas = ofertaService.findByPublicacionIdUsuario(codigoUsuario);
        return ResponseEntity.ok(ofertas);
    }

}