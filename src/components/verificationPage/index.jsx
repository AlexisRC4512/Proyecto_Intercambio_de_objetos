// al validar redireccionar a Login para iniciar sesión

// api: http://localhost:8080/api/usuarios?numero=977326
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const VerificationPage = () => {
  const [verificationCode, setUser] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    let resp;
    try {
      resp = await axios.post(
        `http://localhost:8080/api/usuarios?numero=${verificationCode}`
      );
      console.log({ res: resp.data });
      navigate("/");
    } catch (error) {
      console.log("Error verification-code:\n", error);
      Swal.fire({
          title: "Opps -..-",
          text: "No se pudo validar el código enviado. Intenta nuevamente",
          icon: "error",
          confirmButtonText: "Ok",
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <h2>Bienvenido a Trueque App!</h2>
        <p>
          Hemos enviado un código de verificación a tu correo. Úsalo para
          continuar en el proceso
        </p>
        <br></br>
        <input
          type="text"
          value={verificationCode}
          onChange={(data) => setUser(data.target.value)}
          placeholder="Ingresa el código"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default VerificationPage;
