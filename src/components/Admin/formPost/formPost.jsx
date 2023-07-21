import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import ImageUploader from "./uploadFiles";

import "./styles.css";

const FormPost = () => {
  const navigate = useNavigate();
  const paramsRoute = useLocation()

  const [init, setInit] = useState(null);
  const [categorieSelected, setCategorieSelected] = useState(false);

  const { register, handleSubmit } = useForm();
  const [idImageUploaded, setIdImageUploaded] = useState(null);
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categorieNames, setCategorieNames] = useState({
    categorie: "",
    idCategorie: "",
    subCategorie: "",
    idSubcategorie: "",
  });

  const [yearList, setYearList] = useState([]);

  const postDataDefaultValue = {
    id_categoria: null,
    id_subcategoria: null,
    titulo: null,
    descripcion: null,
    fec_publicacion: null,
    id_estado: 3,
    id_condicion: 1,
    id_usuario: 3,
    codigoUsuario: 0,
    ano_fabricacion: new Date().getFullYear(),
    // imagen: {
    //   id_imagen: null,
    // },
  };
  // setFormDataToUpload(null);
  const [dataPost, setDataPost] = useState(postDataDefaultValue);
  const [formDataToUpload, setFormDataToUpload] = useState(null);

  // To update data
  const [toUpdate, setToUpdate] = useState(false);

  const getCategories = async () => {
    const uri = "http://localhost:8080/api/categorias";
    const categories = (await axios.get(uri)).data;
    console.log({ categories_0: categories });

    const uriSub = `http://localhost:8080/api/subcategorias/getCategoriaId?categoriaId=${categories[0].id_categoria}`;
    const subCategoriesFromApi = (await axios.get(uriSub)).data;
    console.log({ subCategories_api: subCategoriesFromApi });
    let count = 0;
    const subCategoriesWithCounter = subCategoriesFromApi.map((sc) => {
      count++;
      return {
        counter: count,
        ...sc,
      };
    });
    console.log({ subCategoriesFromApi });
    let subcatName = subCategoriesFromApi.filter(
      (c) => c.idSubcategoria === categories[0].id_categoria
    )[0];
    setCategories(categories);
    setSubcategories(subCategoriesFromApi);

    setCategorieSelected(categories[0].nombre);
    if (toUpdate) {
      console.log({ categories___0: categories });
      let catName = categories.filter(
        (c) => c.id_categoria === dataPost.id_categoria
      )[0];
      let subcatName = subcategories.filter(
        (c) => c.idSubcategoria === dataPost.id_subcategoria
      )[0];
      console.log({
        catName,
        subcatName,
      });
      setCategorieNames({
        categorie: catName.nombre,
        idCategorie: catName.id_categoria,
        subCategorie: subcatName.nombre,
        idSubcategorie: subcatName.idSubcategoria,
      });
    } else {
      setCategorieNames({
        categorie: categories[0].nombre,
        idCategorie: categories[0].id_categoria,
        subCategorie: subcatName.nombre,
        idSubcategorie: subcatName.idSubcategoria,
      });
    }
  };

  function setIdImage(id) {
    setDataPost({
      ...dataPost,
      codigoUsuario: JSON.parse(localStorage.getItem("userId")),
      // imagen: {
      //   id_imagen: id,
      // },
    });
  }

  const formSignup = async (field, value) => {
    if (field === "idImage") {
      const userCode = JSON.parse(localStorage.getItem("userId"));
      console.log({ userCode });
      setDataPost({
        ...dataPost,
        codigoUsuario: userCode,
        // imagen: {
        //   id_imagen: value,
        // },
      });
    }
    if (field === "id_subcategoria") {
      let subcatName = subcategories.filter(
        (c) => c.idSubcategoria === value
      )[0];

      setCategorieNames({
        ...categorieNames,
        subCategorie: subcatName.nombre,
        idSubcategorie: subcatName.idSubcategoria,
      });
    }

    if (field === "id_categoria") {
      let catName = categories.filter((c) => c.id_categoria === value)[0];
      setCategorieNames({
        ...categorieNames,
        categorie: catName.nombre,
        idCategorie: catName.id_categoria,
      });

      const uri = `http://localhost:8080/api/subcategorias/getCategoriaId?categoriaId=${value}`;
      const subCategoriesFromApi = (await axios.get(uri)).data;
      console.log({ subCategories_api: subCategoriesFromApi });
      let count = 0;
      const subCategoriesWithCounter = subCategoriesFromApi.map((sc) => {
        count++;
        return {
          counter: count,
          ...sc,
        };
      });
      setSubcategories(subCategoriesFromApi);
    }

    console.log({ dataPost_0: dataPost });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan en 0, por lo tanto, se suma 1
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setDataPost({
      ...dataPost,
      codigoUsuario: JSON.parse(localStorage.getItem("userId")),
      [field]: value,
      fec_publicacion: formattedDate,
      id_categoria: categorieNames.idCategorie,
      id_subcategoria: categorieNames.idSubcategorie,
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    // formData.append("imagen1", data.file[0]);
    // formData.append("imagen2", data.file[1]);
    // formData.append("imagen3", data.file[2]);
    // formData.append("imagen4", data.file[3]);

    const uri =
      "http://localhost:8080/api/publicacion/imagen?imagen1=&imagen2&imagen3&imagen4";
    const res = await axios(uri, {
      method: "POST",
      body: formData,
    });
    const response = res.data;
  };

  const validation = (dataPost) => {
    const isUpdating = localStorage.getItem("productToUpdate");
    if (!formDataToUpload && !isUpdating) {
      Swal.fire({
        title: "Error!",
        text: "Debe de cargar las imágenes primero.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      throw new Error("Debe de cargar las imágenes primero");
    }

    const emptyFieldExist = Object.values(dataPost).filter((field) => !!field);
    if (!emptyFieldExist) {
      Swal.fire({
        title: "Error!",
        text: "Debe completar todos los campos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      throw new Error("Debe completar todos los campos");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setTimeout(() => {
      console.log("1 Segundo esperado");
    }, 1000);

    try {
      console.log({ dataToPost: dataPost });

      validation(dataPost);

      if (toUpdate) {
        const dataLS = JSON.parse(
          localStorage.getItem("productToUpdate")
        ).product;

        const uri = `http://localhost:8080/api/publicacion/publicacionEdit/${dataLS.id_publicacion}`;
        const resp = await axios.put(uri, {
          ...dataLS,
          ...dataPost,
          idEstado: 3,
          idCondicion: 2,
          ano_Fabricacion: dataPost.ano_fabricacion,
          ano_fabricacion: dataPost.ano_fabricacion
        });
        console.log({ res_submit_product: resp.data });
        setDataPost(postDataDefaultValue);
        localStorage.removeItem("productToUpdate");

        navigate("/mainPage");
      } else {
        console.log({
          dataPost_to_post: dataPost,
          formDataToUpload,
        });
        const resp = await axios.post(
          `http://localhost:8080/api/publicacion/publicacion`,
          dataPost
        );
        console.log({ res_submit_product: resp.data });
        setDataPost(postDataDefaultValue);

        const formData = formDataToUpload;
        formData.append("id_publicacion", resp.data.id_publicacion);
        await axios.post("http://localhost:8080/api/publicacion/imagen", formData);

        navigate("/mainPage");
      }
    } catch (error) {
      console.log("Error call post-product-service:\n", error);
      return;
    }
  };

  useEffect(() => {
    console.log({paramsRoute});
    const pathRoute = paramsRoute.pathname;

    const isUpdateProduct = pathRoute !== "/createPost"

    const dataFromLS = JSON.parse(localStorage.getItem("productToUpdate"));
    // setDataPost
    if (dataFromLS && isUpdateProduct) {
      const dataLS = dataFromLS.product;
      setToUpdate(true);
      setDataPost({
        id_categoria: dataLS.id_categoria,
        id_subcategoria: dataLS.id_subcategoria,
        titulo: dataLS.titulo,
        descripcion: dataLS.descripcion,
        fec_publicacion: dataLS.fec_publicacion,
        id_estado: dataLS.idEstado,
        id_condicion: dataLS.idCondicion,
        id_usuario: dataLS.codigoUsuario,
        ano_fabricacion: dataLS.ano_Fabricacion | dataLS.ano_fabricacion,
        codigoUsuario: JSON.parse(localStorage.getItem("userId")),

        // imagen: {
        //   id_imagen: dataLS.imagen.id_imagen,
        // },
      });
    }
    const fetchData = async () => {
      await getCategories();
      setInit(true);
    };

    fetchData().catch(console.error);
  }, [init]);

  return (
    <div className="formPostContainer container">
      <h2>{toUpdate ? "Edición" : "Registro"} de Producto</h2>
      {!!categorieSelected && (
        <>
          <div className="categories-filter">
            <div className="dropdown" id="categories">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {categorieNames.categorie}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {categories.map((categorie) => (
                  <span
                    key={categorie.id_categoria}
                    className="dropdown-item"
                    onClick={() =>
                      formSignup("id_categoria", categorie.id_categoria)
                    }
                  >
                    {categorie?.nombre} - {categorie.id_categoria}
                  </span>
                ))}
              </div>
            </div>

            <div className="dropdown" id="subcategories">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {categorieNames.subCategorie}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {subcategories.map((subcategorie) => (
                  <span
                    key={subcategorie.idSubcategoria}
                    className="dropdown-item"
                    onClick={() =>
                      formSignup("id_subcategoria", subcategorie.idSubcategoria)
                    }
                  >
                    {subcategorie?.nombre} - {subcategorie.idSubcategoria}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {!toUpdate && (
            <div className="postImages">
              <span>Sube las imágenes de tu producto (deben ser 4):</span>
              <ImageUploader EventChange={setFormDataToUpload} />
            </div>
          )}
          <div className="postData">
            <form onSubmit={submitForm}>
              <span className="text-form">
                Completa información sobre el producto
              </span>
              <label>Título</label>
              <input
                type="text"
                value={dataPost.titulo}
                onChange={(data) => formSignup("titulo", data.target.value)}
                placeholder="Ingresa tu nombre de usuario"
              />

              <label>Descripción</label>
              <input
                type="text"
                value={dataPost.descripcion}
                onChange={(data) =>
                  formSignup("descripcion", data.target.value)
                }
                placeholder="Ingresa una descrición sobre el producto"
              />

              <label>Año de fabricación</label>
              <input
                type="number"
                max={new Date().getFullYear()}
                min={1900}
                value={dataPost.ano_fabricacion}
                onChange={(data) =>
                  formSignup("ano_fabricacion", data.target.value)
                }
              />
              <input type="submit" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default FormPost;
