import React, { useState } from "react";
import "./style.css";
import LogoHeader from "../../shared/logoHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [validated, setValidated] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();




  const login =async  (e) => {
    e.preventDefault();

    // corre3cto
    localStorage.setItem(
      "user",
      JSON.stringify({
        user,
        password,
      })
    );

      const resp = await axios.post(`http://localhost:8080/api/login/iniciarSesion?email=${user}&contrasena=${password}`)
      console.log({res: resp.data}); 

      if(resp.data.success){
        navigate("/register");

      }

    // setValidated(true);
  };

  return (
    <div className="container">
      <LogoHeader  style="border-radius: 50%;"/>
      {!validated && (
        <form onSubmit={login}>
          <h2>Ingreso</h2>
          <input
            type="text"
            value={user}
            onChange={(data) => setUser(data.target.value)}
            placeholder="Ingresa tu nombre de usuario"
          />
          <input
            type="password"
            value={password}
            onChange={(data) => setPassword(data.target.value)}
            placeholder="Ingresa tu contraseña"
          />
          <input type="submit" />
        </form>
      )}
      <div className="info-container">
        <p>¿No tienes una cuenta?</p>
        <a href="#">Regístrate aquí</a>
        <p>¿Olvidaste tu contraseña?</p>
        <a href="#">Recupérala aquí</a>
      </div>
    </div>
  );
}

export default LoginPage;
