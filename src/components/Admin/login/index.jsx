import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import LogoHeader from "../../../shared/logoHeader";

function AdminLoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [intents, setIntents] = useState({
    counter: 0,
    time: new Date(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("init ,,,,");
  });

  const login = async (e) => {
    e.preventDefault();

    const isBlock = false;

    if (intents.counter >= 4) {
      const currentTime = new Date();
      console.log({
        currentTime_t: currentTime.getTime(),
        currentTime,
        time2: intents.time,
        time2_t: intents.time.getTime(),
        diff: Math.abs(currentTime - intents.time) / 1000
      });
      const diff =
        (currentTime - intents.time) / (1000);
      // diff /= 60 * 60;
      // return Math. abs(Math. round(diff));
      const diffTime = Math.abs(Math.round(diff));
      console.log({ diffTime });
      const secondsToWaiting = 60
      if (diffTime <= secondsToWaiting) {
        Swal.fire({
          title: "Cantidad de intentos superado",
          text: `Intente nuevamente en ${secondsToWaiting - diffTime} segundos`,
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      } else {
        setIntents({
          counter: 0,
          time: new Date()
        })
      }
    }

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
        `http://localhost:8080/api/login/iniciarSesionAdmin?email=${user}&contrasena=${password}`
      );
      console.log({ res: resp.data });

      if (resp.data.success) {
        navigate("/mainPage");
      } else {
        console.log("krja");
        const addCount = intents.counter++;
        console.log({ addCount_0: addCount });

        setIntents({
          counter: addCount,
          time: new Date(),
        });
        localStorage.setItem("intents", JSON.stringify(intents));
      }
    } catch (error) {
      Swal.fire({
        title: "Credenciales incorrectas!",
        text: "Intente nuevamente",
        icon: "error",
        confirmButtonText: "Ok",
      });
      const addCount = intents.counter++;
      console.log({ addCount });
      // setIntents({
      //   counter: addCount,
      //   time: new Date(),
      // });
      localStorage.setItem("intents", JSON.stringify(intents));
    }
  };

  return (
    <div className="container">
      <LogoHeader style="border-radius: 50%;" />

      <form onSubmit={login}>
        <h2>Ingreso-Admin</h2>
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

export default AdminLoginPage;
