package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.isil.proyectogrupo5.Model.Subcategoria;
import pe.isil.proyectogrupo5.Service.SubcategoriaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subcategorias")
public class SubcategoriaController {
    private final SubcategoriaService subcategoriaService;

    @Autowired
    public SubcategoriaController(SubcategoriaService subcategoriaService) {
        this.subcategoriaService = subcategoriaService;
    }

    @GetMapping
    public ResponseEntity<List<Subcategoria>> getAllSubcategorias() {
        List<Subcategoria> subcategorias = subcategoriaService.getAllSubcategorias();
        return new ResponseEntity<>(subcategorias, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subcategoria> getSubcategoriaById(@PathVariable int id) {
        Optional<Subcategoria> subcategoria = subcategoriaService.getSubcategoriaById(id);
        return subcategoria.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Subcategoria> saveSubcategoria(@RequestBody Subcategoria subcategoria) {
        Subcategoria savedSubcategoria = subcategoriaService.saveSubcategoria(subcategoria);
        return new ResponseEntity<>(savedSubcategoria, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subcategoria> updateSubcategoria(@PathVariable int id, @RequestBody Subcategoria subcategoria) {
        Optional<Subcategoria> existingSubcategoria = subcategoriaService.getSubcategoriaById(id);
        if (existingSubcategoria.isPresent()) {
            subcategoria.setIdSubcategoria(id);
            Subcategoria updatedSubcategoria = subcategoriaService.saveSubcategoria(subcategoria);
            return new ResponseEntity<>(updatedSubcategoria, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubcategoria(@PathVariable int id) {
        subcategoriaService.deleteSubcategoria(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}