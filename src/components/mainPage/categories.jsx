import React, { useEffect, useState } from "react";
import "./styles.css";

import image1 from "../../assets/Plantillas/mainPage/images/v117_402.png";
import image2 from "../../assets/Plantillas/mainPage/images/v117_415.png";
// import image3 from "../../assets/Plantillas/mainPage/images/v117_404.png";
// import image4 from "../../assets/Plantillas/mainPage/images/v117_402.png";
// import image5 from "../../assets/Plantillas/mainPage/images/v117_402.png";


const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([
    {
      id: 1,
      name: 'Electrodomésticos'
    },
    {
      id: 2,
      name: 'Antiguedades'
    },
    {
      id: 3,
      name: 'Fotografía'
    },
    {
      id: 4,
      name: 'Vestimenta'
    },
  ])
  const [categorySelected, setCategorySelected] = useState(1);


  const [productList, setProductList] = useState([
    {
      user: 1,
      userAlias: '@Johny',
      productName: 'Zapatillas',
      imageUrl: 'https://todomusica.com.pe/wp-content/uploads/2021/12/grew.png',
      productCategory: 1
    },
    {
      user: 1,
      userAlias: '@Johny',
      productName: 'Aspiradora',
      imageUrl: image2,
      productCategory: 1
    },
    {
      user: 1,
      userAlias: '@Johny',
      productName: 'Zapatillas Old',
      imageUrl: image1,
      productCategory: 2
    },
    {
      user: 1,
      userAlias: '@Johny',
      productName: 'Aspiradora Old',
      imageUrl: image2,
      productCategory: 2
    },
  ])

  const [productSelected, setProductSelected] = useState(productList.filter(p => p.productCategory === 1));

  const ofertarProduct = (product) => {
    console.log('Producto a ofertar', product);
  }

  const filterProduct = (categoryId) => {
    setCategorySelected(categoryId);
    setProductSelected(productList.filter(p => p.productCategory === categoryId))
  }



  return (
    <div className="v117_370">
      <div className="xd_v117_371">
        <span className="v117_372">Categorias</span>
      </div>
      <div class="v117_384">
        {categoriesList.map(category => (
          <div
            key={category.id}
            className={`category_item ${category.id === categorySelected ? 'category_item_active' : 'category_item_inactive'}`}
            onClick={() => filterProduct(category.id)}
          >
            <span>{category.name}</span>
          </div>
        ))}
      </div>
      {productSelected.length === 0 && (
        <div className="not_products">No hay productos</div>
      )}
      <div className="container_product_list">
        {productSelected.map(item => (
          <div key={item.user} className="v117_398">
            <img src={item.imageUrl} className="imgProductItem" />
            {/* <div className="imgProductItem" style={{
              background: `url(${item.imageUrl})`
            }}></div> */}
            <div className="dataProductItem">
              <div className="name_offer">
                <span className="username">{item.userAlias}</span>
                <span className="offerText">Producto en oferta</span>
              </div>
              <div className="toSearch">
                <span className="text_search">Busca:</span>
                <span className="productname">{item.productName}</span>
              </div>
            </div>
            <div className="toOfferItem" onClick={() => ofertarProduct(item)}>Ofertar</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
