import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ImageUploader = ({ id, EventChange }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedImages = [...selectedImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        updatedImages.push(file);
        if (i === files.length - 1) {
          setSelectedImages(updatedImages);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    try {
      if (selectedImages.length != 4) {
        Swal.fire({
          title: "Error!",
          text: "Debe seleccionar 4 imágenes.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }

      const formData = new FormData();
      // id = "test ..."
      console.log({ type: typeof EventChange });
      for (let i = 0; i <= 4; i++) {
        let image = selectedImages[i];
        formData.append(`imagen${i + 1}`, image);
      }
      // selectedImages.forEach((image, index) => {
      //   formData.append(`image-${index + 1}`, image);
      // });

      axios
        .post(
          "http://localhost:8080/api/publicacion/imagen?imagen1=&imagen2&imagen3&imagen4d",
          formData
        )
        .then((response) => {
          // Procesar la respuesta de la API en caso de éxito
          console.log(response);
          id = response.data;
          EventChange(response.data);
        })
        .catch((error) => {
          // Manejar errores de la solicitud a la API
          console.error(error);
        });
    } catch (error) {}
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
      />
      <button onClick={handleUpload}>Subir</button>
      <div>
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index + 1}`}
            style={{ width: "200px", height: "200px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
