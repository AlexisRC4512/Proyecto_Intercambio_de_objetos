import React, { useEffect, useState } from "react";
import axios from "axios";
import { productCondition, productStates } from "../../shared/constant";
// import image3 from "../../assets/Plantillas/mainPage/images/v117_404.png";
// import image4 from "../../assets/Plantillas/mainPage/images/v117_402.png";
// import image5 from "../../assets/Plantillas/mainPage/images/v117_402.png";
import "./styles.css";
// import img from "../../assets/Ruta_imagen/nuevoNombre20230615204724833.jpg"
import img from "../../assets/Ruta_imagen/nuevoNombre20230616175907098.jpg"
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([])
  const [categorySelected, setCategorySelected] = useState(1);
  const [userId, setuserId] = useState(0)
  const [reviewMyPosts, setReviewMyPosts] = useState(false)
  const [productList, setProductList] = useState([])
  const [productSelected, setProductSelected] = useState([]);
  const navigate = useNavigate();

  const ofertarProduct = (product) => {
    console.log('Producto a ofertar', product);
  }

  const updateProduct = (product) => {
    console.log('updating....', {product});
    localStorage.setItem('productToUpdate', JSON.stringify({
      product,
      updated: false,
    }));
    navigate("/updatePost");
  }

  const filterProduct = (categoryId) => {
    // console.log({categoriaId_filter: categoryId});
    setReviewMyPosts(false);
    setCategorySelected(categoryId);
    setProductSelected(productList.filter(p => p.id_categoria === categoryId));
  }

  const getCategories = async () => {
    const uri = "http://localhost:8080/api/categorias";
    const categories = (await axios.get(uri)).data;
    console.log({ categories_0: categories });
    setCategoriesList(categories);
    setCategorySelected(categories[0].id_categoria)
  };

  const toggleShowMyPosts = () => {
    setProductSelected(productList.filter(p => p.codigoUsuario === userId));
    setProductSelected(productList.filter(p => p.id_categoria === categoriesList[0].id_categoria));
    setReviewMyPosts(!reviewMyPosts);

  }

  useEffect(() => {
    async function fetchData() {
      let resp = await axios.get(
        `http://localhost:8080/api/publicacion/publicacion`
      );
      console.log({resp: resp.data});
      setProductList(resp.data)
      setProductSelected(resp.data.filter(p => p.id_categoria === resp.data[0].id_categoria))
    }
    fetchData()
    getCategories()
    const idUser = JSON.parse(localStorage.getItem('userId'))
    if (idUser) setuserId(idUser);
    // 
  }, [])
  

  return (
    <div className="v117_370">
      <div className="xd_v117_371">
        <span className="v117_372">Categorías</span>
        <br />
        {userId && (
          <button style={{
            margin: '15px'
          }} className="toOfferItem btnBlueactive" onClick={() => toggleShowMyPosts()}>{reviewMyPosts ? 'Ver todas las publicaciones': 'Ver mis publicaciones'}</button>
        )}
      </div>
      {
        !reviewMyPosts && (<div className="v117_384">
        {categoriesList.map(category => (
          <div
            key={category.id_categoria}
            className={`category_item ${category.id_categoria === categorySelected ? 'category_item_active' : 'category_item_inactive'}`}
            onClick={() => filterProduct(category.id_categoria)}
          >
            <span>{category.nombre}</span>
          </div>
        ))}
      </div>)
      }
      {productSelected.length === 0 && (
        <div className="not_products">No hay productos</div>
      )}
      <div className="container_product_list">
        {productSelected.map(item => (
          <div key={item.user} className="v117_398">
            <img src={`../../assets/Ruta_imagen/${item.imagen.imagen1}`} className="imgProductItem" alt="product" />
            {/* <div className="imgProductItem" style={{
              background: `url(${item.imageUrl})`
            }}></div> */}
            <div className="dataProductItem">
              <div className="name_offer">
                <span className="username">{item.titulo}</span>
                <span className="username">{item.id_publicacion}</span>
                <span className="offerText">{item.descripcion}</span>
                <span className="productState">{productStates[item.idEstado]}</span>
                <span className="productCondition">{productCondition[item.idCondicion]}</span>
              </div>
              <div className="toSearch">
                <span className="text_search">Busca:</span>
                <span className="productname">{item.productName}</span>
              </div>
            </div>
            {
              reviewMyPosts && (<div className="toOfferItem btnBlueactive" onClick={() => updateProduct(item)}>Editar</div>)
            }
            {
              !reviewMyPosts && (<div className="toOfferItem" onClick={() => ofertarProduct(item)}>Ofertar</div>)
            }
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
