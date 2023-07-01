package pe.isil.proyectogrupo5.Controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pe.isil.proyectogrupo5.Model.Imagen;
import pe.isil.proyectogrupo5.Model.Publicacion;
import pe.isil.proyectogrupo5.Model.PublicacionHistorial;
import pe.isil.proyectogrupo5.Service.ImagenService;
import pe.isil.proyectogrupo5.Service.PublicacionHistorialService;
import pe.isil.proyectogrupo5.Service.PublicacionService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/publicacion")
public class PublicacionController {
    @Autowired
    private PublicacionService publicacionService;
    @Autowired
    private ImagenService imagenService;
    @Autowired
    private PublicacionHistorialService publicacionHistorialService;
    @PostMapping("/imagen")
    @ResponseBody
    public int uploadImagen(@RequestParam("imagen1") MultipartFile imagen1,
                               @RequestParam("imagen2") MultipartFile imagen2,
                               @RequestParam("imagen3") MultipartFile imagen3,
                               @RequestParam("imagen4") MultipartFile imagen4) {
        Imagen imagen = new Imagen();
        imagen.setImagen1(saveImagen(imagen1));
        imagen.setImagen2(saveImagen(imagen2));
        imagen.setImagen3(saveImagen(imagen3));
        imagen.setImagen4(saveImagen(imagen4));
        imagenService.save(imagen);
        return imagen.getId_imagen().intValue();
    }

    private String saveImagen(MultipartFile file) {
        String rutaImagen = null;
        if (!file.isEmpty()) {
            if (!file.getContentType().equals("image/jpeg")) {
                throw new IllegalArgumentException("Solo se permiten imágenes en formato JPG");
            }
            String timeStamp = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
            String nombreImagen = "nuevoNombre" + timeStamp + ".jpg";
            Path rutaCarpeta = Paths.get("C:/Users/HP/Desktop/Ruta_imagen/");
            if (!Files.exists(rutaCarpeta)) {
                try {
                    Files.createDirectories(rutaCarpeta);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            Path rutaCompleta = rutaCarpeta.resolve(nombreImagen);
            try {
                Files.copy(file.getInputStream(), rutaCompleta);
                rutaImagen = nombreImagen;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return rutaImagen;
    }

    @PostMapping("/publicacion")
    public Publicacion create(@RequestBody Publicacion publicacion) {

        return publicacionService.save(publicacion);
    }
    @GetMapping("/publicacion")
    public ResponseEntity<List<Publicacion>> listarPublicaciones() {
        List<Publicacion> publicaciones = publicacionService.findAll();
        return ResponseEntity.ok(publicaciones);
    }

    @PutMapping("/publicacionEdit/{id}")
    public Publicacion update(@PathVariable Long id, @RequestBody Publicacion publicacion) {
        Publicacion existingPublicacion = publicacionService.findById(id);
        Date fechaActual = new Date(System.currentTimeMillis());

        BeanUtils.copyProperties(publicacion, existingPublicacion, "id_publicacion");
        PublicacionHistorial publicacionHistorial= new PublicacionHistorial(existingPublicacion.getId_publicacion().intValue(),existingPublicacion.getId_categoria(),existingPublicacion.getId_subcategoria(),
                existingPublicacion.getTitulo(),existingPublicacion.getDescripcion(),existingPublicacion.getFec_publicacion(),existingPublicacion.getIdEstado(),existingPublicacion.getIdEstado(),existingPublicacion.getIdEstado(),existingPublicacion.getAno_Fabricacion(),
                existingPublicacion.getImagen().getId_imagen().intValue(),fechaActual);
        publicacionHistorialService.savePublicacionHistorial(publicacionHistorial);
        return publicacionService.save(existingPublicacion);
    }
    @GetMapping("/publicaciones/{id}")
    public ResponseEntity<Publicacion> obtenerPublicacionPorId(@PathVariable Long id) {
        Publicacion publicacion = publicacionService.findById(id);
        if (publicacion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(publicacion);
    }

    @GetMapping("/imagen/{nombreImagen}")
    public ResponseEntity<Resource> obtenerImagen(@PathVariable String nombreImagen) {
        String rutaBase = "C:/Users/HP/Desktop/Ruta_imagen/";
        String rutaImagen = rutaBase + nombreImagen;
        System.out.println("Ruta de la imagen solicitada: " + rutaImagen);
        try {
            Resource resource = new UrlResource(Paths.get(rutaImagen).toUri());
            if (resource.exists() && resource.isReadable()) {
                System.out.println("El recurso existe y es legible");
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                        .body(resource);
            } else {
                System.out.println("El recurso no existe o no es legible");
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            System.out.println("Error al crear el recurso: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    @DeleteMapping("/publicacion/{id}")
    public void delete(@PathVariable Long id) {
        publicacionService.deleteById(id);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Publicacion>> findByUserId(@PathVariable int idUsuario) {
        List<Publicacion> publicaciones = publicacionService.findBycodigoUsuario(idUsuario);
        return ResponseEntity.ok(publicaciones);
    }
}