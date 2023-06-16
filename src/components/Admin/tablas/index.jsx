import React, { useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { useState } from "react";

const AdminTablas = () => {
  const [init, setInit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categorieSelected, setCategorieSelected] = useState(false);

  const getCategories = async () => {
    const uri = "http://localhost:8080/api/categorias";
    const categories = (await axios.get(uri)).data;
    console.log({ categories_0: categories });
    setCategories(categories);
    setCategorieSelected(categories[0].nombre);
    changeTableItems(categories[0].id_categoria)
    console.log({ categorieSelected });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
      setInit(true);
    };

    fetchData().catch(console.error);
  }, [init]);

  const changeTableItems = async (idCategorie) => {
    const cats = categories.filter((c) => c.id_categoria === idCategorie);
    console.log({ categorie: idCategorie, cat: cats[0].nombre, cats });
    setCategorieSelected(cats[0].nombre);

    const uri = `http://localhost:8080/api/subcategorias/getCategoriaId?categoriaId=${idCategorie}`;
    const subCategoriesFromApi = (await axios.get(uri)).data;
    console.log({ subCategories_api: subCategoriesFromApi });
    let count = 0;
    const subCategoriesWithCounter = subCategoriesFromApi.map(sc => {
        count++;
        return {
            counter: count,
            ...sc
        }
    })
    setSubcategories(subCategoriesFromApi);
    console.log({subcategories__001: subCategoriesFromApi});
  };

  return (
    <div className="container-tables">
      <div className="header">Bienvenido Chisito! -.-</div>
      {!!categorieSelected && (
        <div className="table-container">
          <div className="table-filter">
            <div className="dropdown" id="categories">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {categorieSelected}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {categories.map((categorie) => (
                  <span
                    key={categorie.id_categoria}
                    className="dropdown-item"
                    onClick={() => changeTableItems(categorie.id_categoria)}
                  >
                    {categorie?.nombre} - {categorie.id_categoria}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="table-items">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {subcategories.map((sc, index) => (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{sc.nombre}</td>
                    <td>{sc.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTablas;
