import React from "react";
import "./styles.css";
import posterImage from "../../assets/Plantillas/mainPage/images/poster.png";

const Header = () => {
  return (
    <div className="v117_341">
      {/* <div className="v117_342"></div> */}
      <div className="v117_343">
        <div className="v117_354">
          <span className="v117_356">
            Hola, Carlos ¿Intercambiamos algo?
          </span>
          <div className="xd_v117_357">
            <div className="v117_358">
              <span className="xd_v117_359">Publicar</span>
            </div>
          </div>
        </div>
        <div className="v117_344">
          <div className="v117_345">
            <div className="xd_v117_346">17k+</div>
            <div className="v117_347">Intercambios</div>
          </div>
          <div className="v117_345">
            <div className="xd_v117_349">2k+</div>
            <div className="v117_347">Usuarios</div>
          </div>
          <div className="v117_345">
            <div className="xd_v117_352">24k+</div>
            <div className="v117_347">Ofertas</div>
          </div>
        </div>
      </div>
      <div className="posterContainer">
        <img src={posterImage} alt="" className="" />
      </div>
    </div>
  );
};

export default Header;
