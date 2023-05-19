import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import LogoHeader from "../../shared/logoHeader";

function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("init ,,,,");
  });

  const login = async (e) => {
    e.preventDefault();

    // corre3cto
    localStorage.setItem(
      "user",
      JSON.stringify({
        user,
        password,
      })
    );
    let resp;
    try {
      resp = await axios.post(
        `http://localhost:8080/api/login/iniciarSesion?email=${user}&contrasena=${password}`
      );
      console.log({ res: resp.data });

      if (resp.data.success) {
        navigate("/mainPage");
      } else {
        console.log("krja");
      }
    } catch (error) {
      console.log("krja", error);
    }
  };

  return (
    <div className="container">
      <LogoHeader style="border-radius: 50%;" />

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
      <div className="info-container">
        <p>¿No tienes una cuenta?</p>
        <a href="/signup">Regístrate aquí</a>
        {/* <p>¿Olvidaste tu contraseña?</p>
        <a href="#">Recupérala aquí</a> */}
      </div>
    </div>
  );
}

export default LoginPage;
