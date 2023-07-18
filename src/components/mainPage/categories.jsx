import React, { useEffect, useState } from "react";
import axios from "axios";
import { productCondition, productStates } from "../../shared/constant";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SweetAlert2 from "react-sweetalert2";

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categorySelected, setCategorySelected] = useState(1);
  const [userId, setuserId] = useState(0);
  const [reviewAllPosts, setReviewMyPosts] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productSelected, setProductSelected] = useState([]);
  const [myProductsInOffer, setMyProductsInOffer] = useState([]);

  const navigate = useNavigate();

  const [modalProps, setmodalProps] = useState({
    show: false,
    title: "Elige cuál de tus productos quieres ofertar",
    idProductToWant: null,
  });

  const getMyProductOnOffer = async (userId) => {
    const uriGetMyProductsOnOffer = `http://localhost:8080/api/ofertas/ofertas/usuario2/${userId}`;
    const request = await axios.get(uriGetMyProductsOnOffer);

    setMyProductsInOffer(request.data);
  };

  const selectedProductForOffer = async (
    myProductForChange,
    selectedProduct
  ) => {
    console.log({ product_for_offer: myProductForChange, selectedProduct });
    const uriOfferProduct = "http://localhost:8080/api/ofertas";

    const requestOffer = await axios.post(uriOfferProduct, {
      publicacion1: {
        id_publicacion: selectedProduct.id_publicacion,
      },
      publicacion2: {
        id_publicacion: myProductForChange.id_publicacion,
      },
      estado: 1,
    });

    const respOffer = requestOffer.data;
    console.log({ respOffer });
    if (requestOffer.status == 201) {
      Swal.fire({
        title: "Genial!!",
        text: "Has hecho una propuesta de trueque",
        icon: "success",
        confirmButtonText: "Ok",
      });

      await getMyProductOnOffer(userId);
    }
  };

  const ofertarProduct = (product) => {
    console.log("Producto a ofertar", product);

    setmodalProps({
      ...modalProps,
      show: true,
      idProductToWant: product,
    });
  };

  const updateProduct = (product) => {
    console.log("updating....", { product });
    localStorage.setItem(
      "productToUpdate",
      JSON.stringify({
        product,
        updated: false,
      })
    );
    navigate("/updatePost");
  };

  const filterProduct = (categoryId) => {
    // console.log({categoriaId_filter: categoryId});
    setReviewMyPosts(false);
    setCategorySelected(categoryId);
    setProductSelected(
      productList.filter((p) => {
        if (p.id_categoria === categoryId) {
          if (userId) {
            return p.codigoUsuario !== userId;
          }
          return p;
        }
      })
    );
  };

  const getCategories = async () => {
    const uri = "http://localhost:8080/api/categorias";
    const categories = (await axios.get(uri)).data;
    console.log({ categories_0: categories });
    setCategoriesList(categories);
    setCategorySelected(categories[0].id_categoria);
  };

  const toggleShowMyPosts = async () => {
    if (!reviewAllPosts) {
      setProductSelected(productList.filter((p) => p.codigoUsuario === userId));
      const uriGetMyProductsWithInteres = ` http://localhost:8080/api/ofertas/ofertas/usuario1/${userId}`;
      const requestMyProductWithInteres = await axios.get(uriGetMyProductsWithInteres);
      const responseMyProductsWithInteres = requestMyProductWithInteres.data;
      const dataMyProducts = productList.filter((p) => p.codigoUsuario === userId);

      console.log({
        responseMyProductsWithInteres,
        dataMyProducts
      });


    } else {
      setProductSelected(
        productList.filter((p) => {
          if (
            p.id_categoria === categorySelected &&
            p.codigoUsuario !== userId
          ) {
            return p;
          }
        })
      );
    }
    setReviewMyPosts(!reviewAllPosts);
  };

  const getImagesByPost = async (idPost) => {
    let resp = await axios.get(
      `http://localhost:8080/api/publicacion/imagenIdpublicacion/${idPost}`
    );
    return resp.data;
  };

  useEffect(() => {
    async function fetchData() {
      let resp = await axios.get(
        `http://localhost:8080/api/publicacion/publicacion`
      );
      console.log({ resp: resp.data });
      const listaProducts = resp.data;
      let productListFormated = [];
      // await listaProducts.map(async (product) => {
      for (let j = 0; j < resp.data.length; j++) {
        const product = resp.data[j];
        const imagesByPost = await getImagesByPost(product.id_publicacion);

        productListFormated.push({
          ...product,
          imagenes:
            imagesByPost && imagesByPost.length > 0 ? imagesByPost : false,
        });
      }
      console.log({ productListFormated });
      setProductList(productListFormated);
      // setProductSelected(
      //   productListFormated.filter(
      //     (p) => p.id_categoria === resp.data[0].id_categoria
      //   )
      // );
      setProductSelected(
        productListFormated.filter((p) => {
          if (p.id_categoria === resp.data[0].id_categoria) {
            if (userId) {
              return p.codigoUsuario !== userId;
            }
            return p;
          }
        })
      );
      const idUser = JSON.parse(localStorage.getItem("userId"));
      if (idUser) {
        setuserId(idUser);
        await getMyProductOnOffer(idUser);
      }
    }
    fetchData();
    getCategories();
  }, []);

  return (
    <div className="v117_370">
      <SweetAlert2
        showConfirmButton={false}
        {...modalProps}
        didClose={() =>
          setmodalProps({
            ...modalProps,
            show: false,
          })
        }
        showDenyButton={true}
        denyButtonText="Cancelar"
        willClose={() =>
          setmodalProps({
            ...modalProps,
            show: false,
          })
        }
      >
        <div className="table-responsive">
          <table className="table table-primary">
            <tbody>
              {productList
                .filter((p) => p.codigoUsuario == userId)
                .map((myProduct) => {
                  if (
                    !myProductsInOffer
                      .map((e) => e.publicacion2.id_publicacion)
                      .includes(myProduct.id_publicacion)
                  ) {
                    return (
                      <tr className="">
                        <td className="miniImgProduct" scope="row">
                          <div className="item-container">
                            <img
                              key={myProduct.id_publicacion}
                              src={`../../assets/Ruta_imagen/${myProduct.imagenes[0]}`}
                              className="miniImgProductItem"
                              alt="product"
                            />
                            <span>{myProduct.titulo}</span>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              selectedProductForOffer(
                                myProduct,
                                modalProps.idProductToWant
                              )
                            }
                          >
                            Seleccionar
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}

              {productList
                .filter((p) => p.codigoUsuario === userId)
                .map((myProduct) => {
                  myProductsInOffer.map((myProductInOffer) => {
                    if (
                      myProductInOffer.publicacion2.id_publicacion !==
                      myProduct.id_publicacion
                    ) {
                    }
                  });
                })}
            </tbody>
          </table>
        </div>
      </SweetAlert2>
      <div className="xd_v117_371">
        <span className="v117_372">Categorías</span>
        <br />
        {userId && (
          <button
            style={{
              margin: "15px",
            }}
            className="toOfferItem btnBlueactive"
            onClick={() => toggleShowMyPosts()}
          >
            {reviewAllPosts
              ? "Ver todas las publicaciones"
              : "Ver mis publicaciones"}
          </button>
        )}
      </div>
      {!reviewAllPosts && (
        <div className="v117_384">
          {categoriesList.map((category) => (
            <div
              key={category.id_categoria}
              className={`category_item ${
                category.id_categoria === categorySelected
                  ? "category_item_active"
                  : "category_item_inactive"
              }`}
              onClick={() => filterProduct(category.id_categoria)}
            >
              <span>{category.nombre}</span>
            </div>
          ))}
        </div>
      )}
      {productSelected.length === 0 && (
        <div className="not_products">No hay productos</div>
      )}
      <div className="container_product_list">
        {productSelected.map((item) => (
          <div key={item.user} className="v117_398">
            {item.imagenes && (
              <img
                key={item.user}
                src={`../../assets/Ruta_imagen/${item.imagenes[0]}`}
                className="imgProductItem"
                alt="product"
              />
            )}

            {/* <div className="imgProductItem" style={{
              background: `url(${item.imageUrl})`
            }}></div> */}
            <div className="dataProductItem">
              <div className="name_offer">
                <span className="username">{item.titulo}</span>
                {/* <span className="username">{item.id_publicacion}</span> */}
                <span className="offerText">{item.descripcion}</span>
                <span className="productState">
                  {productStates[item.idEstado]} |{" "}
                  {productCondition[item.idCondicion]}{" "}
                </span>
                {/* <span className="productCondition">{productCondition[item.idCondicion]}</span> */}
              </div>
              <div className="toSearch">
                <span className="text_search">Busca:</span>
                <span className="productname">{item.productName}</span>
              </div>
            </div>
            {reviewAllPosts && (
              <div
                className="toOfferItem btnBlueactive"
                onClick={() => updateProduct(item)}
              >
                Editar
              </div>
            )}
            {!reviewAllPosts && (
              <div
                className="toOfferItem btnBlueactive"
                onClick={() => ofertarProduct(item)}
              >
                Ofertar
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
