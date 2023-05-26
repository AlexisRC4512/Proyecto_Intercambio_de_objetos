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
      productName: 'Refrigeradora',
      imageUrl: 'https://electroluxpe.vtexassets.com/arquivos/ids/159912-800-800?v=638126103071030000&width=800&height=800&aspect=true',
      productCategory: 1
      },
    {
      user: 2,
      userAlias: '@Jane',
      productName: 'Lavadora',
      imageUrl: 'https://www.efameinsa.com/image/cache/catalog/productos/lavanderia/lavadoras-comerciales/giant-c-moneda-apilable/lavadora-comercial-apilable-sistema-a-moneda-giant-c+-lg-efameinsa-800x800.jpg',
      productCategory: 1
    },
    {
      user: 3,
      userAlias: '@Alex',
      productName: 'Licuadora',
      imageUrl: 'https://wongfood.vtexassets.com/arquivos/ids/604944-800-auto?v=638068090374870000&width=800&height=auto&aspect=true',
      productCategory: 1
      },
      {
        user: 50,
        userAlias: '@Michel',
        productName: 'Tostadora',
        imageUrl: 'https://falabella.scene7.com/is/image/FalabellaPE/gsc_119536744_2382398_3?wid=800&hei=800&qlt=70',
        productCategory: 1
      },
      {
          user: 4,
          userAlias: '@Michael',
          productName: 'Reloj de bolsillo antiguo',
          imageUrl: 'https://ae01.alicdn.com/kf/H74b7f267f993483096f5384fc13a0ab4F/Relojes-de-bolsillo-mec-nicos-dorados-de-lujo-reloj-Fob-mec-nico-de-bobinado-a-mano.jpg',
          productCategory: 2
      },
      {
        user: 5,
        userAlias: '@Laura',
        productName: 'Máquina de escribir vintage',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0569/2414/3824/products/47-Maquina-Gris-Japy_1200x1200.jpg?v=1652457644',
        productCategory: 2
      },
      {
        user: 6,
        userAlias: '@Peter',
        productName: 'Cámara nikon',
        imageUrl: 'data:image/jpeg;base64,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',
        productCategory: 2
      },
      {
        user: 7,
        userAlias: '@Sarah',
        productName: 'Lente gran angular',
        imageUrl: 'https://pesonyb2c.vtexassets.com/arquivos/ids/206609-800-800?v=637086407286130000&width=800&height=800&aspect=true',
        productCategory: 3
      },
      {
        user: 8,
        userAlias: '@Mark',
        productName: 'Trípode profesional',
        imageUrl: 'https://coolboxpe.vtexassets.com/arquivos/ids/211801/NT-513_3.jpg?v=637879605303100000',
        productCategory: 3
      },
      {
        user: 9,
        userAlias: '@Emily',
        productName: 'Cámara digital',
        imageUrl: 'https://pesonyb2c.vtexassets.com/arquivos/ids/205414-800-800?v=636975839712330000&width=800&height=800&aspect=true',
        productCategory: 3
      },
      {
        user: 20,
        userAlias: '@Jose',
        productName: 'Cámara digital',
        imageUrl: 'https://www.acomputerservice.com.pe/3618-thickbox_default/camara-digital-canon-mirrorless-eos-m50-bkus-ii-ef-m-241mp-4k-uhd.jpg',
        productCategory: 3
      },
      {
        user: 10,
        userAlias: '@Olivia',
        productName: 'Vestido elegante negro',
        imageUrl: 'https://ae01.alicdn.com/kf/H7b4a5d2007c1421e97be727feeec8d5bK/Vestido-de-noche-negro-elegante-largo-satinado-con-cuentas-sin-tirantes-abertura-alta-Formal-para-baile.jpg_Q90.jpg_.webp',
        productCategory: 4
      },
      {
        user: 11,
        userAlias: '@Daniel',
        productName: 'Zapatos de cuero',
        imageUrl: 'https://i.ebayimg.com/images/g/fJwAAOSwOl1kBdQ-/s-l1600.jpg',
        productCategory: 4
      },
      {
        user: 12,
        userAlias: '@Sophia',
        productName: 'Sombrero de ala ancha',
        imageUrl: 'https://i.ebayimg.com/images/g/NboAAOSwPDFimUOn/s-l1600.jpg',
        productCategory: 4
      },
      {
        user: 13,
        userAlias: '@Marcos',
        productName: 'Casaca de cuero',
        imageUrl: 'https://unipiel.com/wp-content/uploads/2017/08/casaca-cuero-hombre-campera-chaqueta-CSC400-1.jpg',
        productCategory: 4
      }

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
