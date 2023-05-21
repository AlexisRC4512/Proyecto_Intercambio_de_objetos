package pe.isil.proyectogrupo5.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.isil.proyectogrupo5.Model.Categoria;
import pe.isil.proyectogrupo5.Model.Subcategoria;
import pe.isil.proyectogrupo5.Repository.CategoriaRepository;
import pe.isil.proyectogrupo5.Repository.SubcategoriaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SubcategoriaService {
    private final SubcategoriaRepository subcategoriaRepository;
    private final  CategoriaRepository categoriaRepository;
    @Autowired
    public SubcategoriaService(SubcategoriaRepository subcategoriaRepository, CategoriaRepository categoriaRepository, CategoriaRepository categoriaRepository1) {
        this.subcategoriaRepository = subcategoriaRepository;
        this.categoriaRepository = categoriaRepository1;
    }

    public List<Subcategoria> getAllSubcategorias() {
        return subcategoriaRepository.findAll();
    }

    public Optional<Subcategoria> getSubcategoriaById(int id) {
        return subcategoriaRepository.findById(id);
    }

    public Subcategoria saveSubcategoria(Subcategoria subcategoria) {
        return subcategoriaRepository.save(subcategoria);
    }

    public void deleteSubcategoria(int id) {
        subcategoriaRepository.deleteById(id);
    }
    public List<Subcategoria> getSubcategoriasByCategoriaId(int categoriaId) {
        Optional<Categoria> categoria = categoriaRepository.findById(categoriaId);
        return subcategoriaRepository.findByCategoria(categoria);
    }
}