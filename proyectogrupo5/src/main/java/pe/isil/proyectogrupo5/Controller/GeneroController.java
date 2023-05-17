package pe.isil.proyectogrupo5.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.Genero;
import pe.isil.proyectogrupo5.Service.GeneroService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/generos")
public class GeneroController {

    private final GeneroService generoService;

    public GeneroController(GeneroService generoService) {
        this.generoService = generoService;
    }

    @GetMapping
    public List<Genero> getAllGeneros() {
        return generoService.getAllGeneros();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genero> getGeneroById(@PathVariable("id") int id) {
        Genero genero = generoService.getGeneroById(id);
        if (genero != null) {
            return ResponseEntity.ok(genero);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Genero> createGenero(@RequestBody Genero genero) {
        Genero createdGenero = generoService.createGenero(genero);
        return ResponseEntity.created(URI.create("/generos/" + createdGenero.getIdGenero())).body(createdGenero);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genero> updateGenero(@PathVariable("id") int id, @RequestBody Genero genero) {
        Genero updatedGenero = generoService.updateGenero(id, genero);
        if (updatedGenero != null) {
            return ResponseEntity.ok(updatedGenero);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenero(@PathVariable("id") int id) {
        boolean deleted = generoService.deleteGenero(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
