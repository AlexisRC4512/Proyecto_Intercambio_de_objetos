import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  postState,
  productCondition,
  productStates,
} from "../../shared/constant";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SweetAlert2 from "react-sweetalert2";

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categorySelected, setCategorySelected] = useState(1);
  const [userId, setuserId] = useState(0);
  const [reviewAllPosts, setReviewMyPosts] = useState(true);
  const [productList, setProductList] = useState([]);
  const [productSelected, setProductSelected] = useState([]);
  const [myProductsInOffer, setMyProductsInOffer] = useState([]);
  const [listaIntercambioPorMiProduct, setListaIntercambioPorMiProduct] =
    useState([]);

  const navigate = useNavigate();

  const [modalProps, setmodalProps] = useState({
    show: false,
    title: "Elige cuál de tus productos quieres ofertar",
    idProductToWant: null,
  });

  const [modalOfertasProps, setModalOfertasProps] = useState({
    show: false,
    title:
      "Esta es la lista de products que se ofrecen a cambio de tu producto:",
    idProductToWant: null,
  });

  const [productoOfertaAceptada, setProductoOfertaAceptada] = useState({});

  const ACEPTADO = 2;
  const RECHAZADO = 3;

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
      setmodalProps({
        ...modalProps,
        show: false,
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

  const getOfferForMyProduct = async (offerIds = []) => {
    console.log({ reviewAllPosts });
    if (!reviewAllPosts) {
      console.log({ offerIds });
      const listaIntercambioPorMiProduct_aux = [];
      const prefixImage = "../../assets/Ruta_imagen/";

      for (let j = 0; j < offerIds.length; j++) {
        const offerId = offerIds[j];

        console.log({ offerId });
        const uriGetProductsByOfferAndProduct = `http://localhost:8080/api/ofertas/${offerId.idOferta}`;
        const requestProductsByOfferAndProduct = await axios.get(
          uriGetProductsByOfferAndProduct
        );

        const responseProductsByOffer = requestProductsByOfferAndProduct.data;
        const idImageProductByOffer =
          responseProductsByOffer.publicacion2.id_publicacion;
        const requestImageByProduct = await axios.get(
          `http://localhost:8080/api/publicacion/imagenIdpublicacion/${idImageProductByOffer}`
        );

        if (responseProductsByOffer.estado !== 1) continue;

        listaIntercambioPorMiProduct_aux.push({
          imagen: prefixImage + requestImageByProduct.data[0],
          oferta: responseProductsByOffer,
        });
      }

      console.log(".... getOfferForMyProduct", {
        listaIntercambioPorMiProduct_aux,
      });
      setListaIntercambioPorMiProduct(listaIntercambioPorMiProduct_aux);
      setModalOfertasProps({
        ...modalOfertasProps,
        show: true,
      });
    }
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
    // setReviewMyPosts(false);
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
    if (reviewAllPosts) {
      const myProducts = productList.filter((p) => p.codigoUsuario === userId);
      const ofertasByUser = await getOfertaUsuario1ByUser(userId);
      const listaMisProductsConOferta = [
        ...new Set(
          ofertasByUser.map((oferta) => oferta.publicacion1.id_publicacion)
        ),
      ];
      const listaOffertas = ofertasByUser.map((oferta) => {
        return {
          idOferta: oferta.idOferta,
          publicacion: oferta.publicacion1.id_publicacion,
        };
      });
      console.log({ listaOffertas, listaMisProductsConOferta, ofertasByUser });

      let newProductsSelected = [];
      // const newProductsSelected = myProducts.map(async (mp) => {
      for (let index_1 = 0; index_1 < myProducts.length; index_1++) {
        const mp = myProducts[index_1];

        if (listaMisProductsConOferta.includes(mp.id_publicacion)) {
          let requestProductsByOfferAndProduct, requestUserById;
          // const hasOffer = ofertasByUser.filter(async (oferta) => {
          let hasOffer = [];
          for (let index_2 = 0; index_2 < ofertasByUser.length; index_2++) {
            const oferta = ofertasByUser[index_2];

            if (oferta.publicacion1.id_publicacion === mp.id_publicacion) {
              if (oferta.estado === 2) {
                console.log("-------------- hay 2");
                const uriGetProductsByOfferAndProduct = `http://localhost:8080/api/ofertas/${oferta.idOferta}`;
                requestProductsByOfferAndProduct = await axios.get(
                  uriGetProductsByOfferAndProduct
                );

                const uriGetUserById = `http://localhost:8080/api/usuarios/${requestProductsByOfferAndProduct.data.publicacion2.codigoUsuario}`;
                requestUserById = await axios.get(uriGetUserById);

                console.log("----------- con data ....", {
                  requestUserById: requestUserById.data,
                  requestProductsByOfferAndProduct:
                    requestProductsByOfferAndProduct.data,
                });

                // setProductoOfertaAceptada({
                //   user: requestUserById.data,
                //   product: requestProductsByOfferAndProduct.data,
                // });
              }
              if (oferta.estado === 1) {
                hasOffer.push(oferta);
              }
            }
          }
          console.log("-----retuyrned");

          newProductsSelected.push({
            ...mp,
            withOffer: hasOffer.length > 0,
            idOfertas: listaOffertas.filter(
              (oferta) => oferta.publicacion == mp.id_publicacion
            ),
            dataUserAttended: requestUserById?.data,
            dataProductAttended: requestProductsByOfferAndProduct?.data?.publicacion2,
            // dataOfferAcepted: {
            //   user: requestUserById?.data,
            // },
          });
        } else {
          newProductsSelected.push(mp);
        }
      }

      // const promiseData = await Promise.all(newProductsSelected);
      // console.log({ promiseData });


      console.log({
        myProducts,
        listaMisProductsConOferta,
        newProductsSelected,
      });
      setProductSelected(newProductsSelected);
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

  const getOfertaUsuario1ByUser = async (userId) => {
    const uriOfertasUsuario1ByUser = `http://localhost:8080/api/ofertas/ofertas/usuario1/${userId}`;

    const requestOfertaByUser = await axios.get(uriOfertasUsuario1ByUser);
    const responseOfertaByUser = requestOfertaByUser.data;
    console.log({ responseOfertaByUser });
    return responseOfertaByUser;
  };

  const showDataUserOfferAcepted = (dataUserAttended, dataProductAttended) => {
    console.log({dataUserAttended, dataProductAttended});
    Swal.fire({
      title: "Usuario atendido",
      icon: "info",
      html: `
      <table className="table table-primary">
      <tbody>
        <tr className="">
          <td scope="row">Nombre completo</td>
          <td>${dataUserAttended.nombres} ${dataUserAttended.apellidos}</td>
        </tr>
        <tr className="">
          <td scope="row">Email</td>
          <td>${dataUserAttended.email}</td>
        </tr>
        <tr className="">
          <td scope="row">Producto de intercambio</td>
          <td>${dataProductAttended.titulo}</td>
        </tr>
      </tbody>
    </table>
      `,
      showCloseButton: true,
    });
  };

  const updateOfferState = async (idOferta, isAccept) => {
    const offerToUpdateState = isAccept ? ACEPTADO : RECHAZADO;
    const uriUpdateOfferState = `http://localhost:8080/api/ofertas/editarOfertaEstado/${idOferta}?estado=${offerToUpdateState}`;

    const requestUpdateOfferState = await axios.put(uriUpdateOfferState);
    const responseUpodateOfferState = requestUpdateOfferState.data;

    if (responseUpodateOfferState) {
      Swal.fire({
        title: "Genial!!",
        text: "Tu oferta se ha completado",
        icon: "success",
        confirmButtonText: "Ok",
      });
      window.location.reload(false);
    }
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
      {!reviewAllPosts && (
        <SweetAlert2
          width={800}
          showConfirmButton={false}
          {...modalOfertasProps}
          didClose={() =>
            setModalOfertasProps({
              ...modalOfertasProps,
              show: false,
            })
          }
          showDenyButton={true}
          denyButtonText="Cancelar"
          willClose={() =>
            setModalOfertasProps({
              ...modalOfertasProps,
              show: false,
            })
          }
        >
          <div className="table-responsive">
            <table className="table table-primary">
              <tbody>
                {listaIntercambioPorMiProduct.map((product) => {
                  if (
                    !myProductsInOffer
                      .map((e) => e.publicacion2.id_publicacion)
                      .includes(product.id_publicacion)
                  ) {
                    return (
                      <tr className="">
                        <td className="miniImgProduct" scope="row">
                          <div className="item-container">
                            <img
                              key={product.oferta.publicacion2.id_publicacion}
                              src={product.imagen}
                              className="miniImgProductItem"
                              alt="product"
                            />
                            <span>{product.oferta.publicacion2.titulo}</span>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              updateOfferState(product.oferta.idOferta, true)
                            }
                          >
                            Aceptar
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                              updateOfferState(product.oferta.idOferta, false)
                            }
                          >
                            Rechazar
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
      )}
      <div className="" style={{ textAlign: "center" }}>
        <span className="v117_372">Categorías</span>
      </div>
      <div className="toggleShowMyPostsContainer">
        <div
          className={`xd_v117_371 ${
            reviewAllPosts ? "switchBtnInactive" : "switchBtnActive"
          }`}
        >
          {userId && (
            <button
              style={{
                margin: "15px",
              }}
              className={`toOfferItem ${reviewAllPosts ? "btnBlueactive" : ""}`}
              onClick={() => toggleShowMyPosts()}
              disabled={reviewAllPosts}
            >
              Todas las publicaciones
            </button>
          )}
        </div>
        <div
          className={`xd_v117_371 ${
            reviewAllPosts ? "switchBtnActive" : "switchBtnInactive"
          }`}
        >
          {userId && (
            <button
              style={{
                margin: "15px",
              }}
              className={`toOfferItem ${
                !reviewAllPosts ? "btnBlueactive" : ""
              }`}
              onClick={() => toggleShowMyPosts()}
              disabled={!reviewAllPosts}
            >
              Mis publicaciones
            </button>
          )}
        </div>
      </div>

      {reviewAllPosts && (
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
            {!reviewAllPosts && (
              <div
                className="toOfferItem btnBlueactive"
                onClick={() => updateProduct(item)}
              >
                Editar
              </div>
            )}
            {reviewAllPosts && (
              <div
                className="toOfferItem btnBlueactive"
                onClick={() => ofertarProduct(item)}
              >
                Ofertar
              </div>
            )}
            <br />
            {item.withOffer && (
              <div
                className="toOfferItem btnOrangeactive"
                onClick={() => getOfferForMyProduct(item.idOfertas)}
              >
                Tiene Ofertas
              </div>
            )}
            {item.dataUserAttended && (
              <div
                className="toOfferItem btnOrangeactive"
                onClick={() => showDataUserOfferAcepted(item.dataUserAttended, item.dataProductAttended)}
              >
                Oferta atendida
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
