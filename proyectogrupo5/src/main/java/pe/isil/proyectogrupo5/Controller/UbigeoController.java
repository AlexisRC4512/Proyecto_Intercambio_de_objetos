package pe.isil.proyectogrupo5.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.Ubigeo;
import pe.isil.proyectogrupo5.Service.UbigeoService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/ubigeos")
public class UbigeoController {

    private final UbigeoService ubigeoService;

    public UbigeoController(UbigeoService ubigeoService) {
        this.ubigeoService = ubigeoService;
    }

    @GetMapping
    public List<Ubigeo> getAllUbigeos() {
        return ubigeoService.getAllUbigeos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ubigeo> getUbigeoById(@PathVariable("id") String id) {
        Ubigeo ubigeo = ubigeoService.getUbigeoById(id);
        if (ubigeo != null) {
            return ResponseEntity.ok(ubigeo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Ubigeo> createUbigeo(@RequestBody Ubigeo ubigeo) {
        Ubigeo createdUbigeo = ubigeoService.createUbigeo(ubigeo);
        return ResponseEntity.created(URI.create("/ubigeos/" + createdUbigeo.getIdUbigeo())).body(createdUbigeo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ubigeo> updateUbigeo(@PathVariable("id") String id, @RequestBody Ubigeo ubigeo) {
        Ubigeo updatedUbigeo = ubigeoService.updateUbigeo(id, ubigeo);
        if (updatedUbigeo != null) {
            return ResponseEntity.ok(updatedUbigeo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUbigeo(@PathVariable("id") String id) {
        boolean deleted = ubigeoService.deleteUbigeo(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
