import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import LogoHeader from "../../shared/logoHeader";

const validation = (signupUser) => {
  const emptyFieldExist = Object.values(signupUser).filter(
    (field) => field.length === 0
  );
  if (emptyFieldExist.length > 1) {
    Swal.fire({
      title: "Error!",
      text: "Debe completar todos los campos.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw new Error("Debe completar todos los campos");
  }

  const fieldsBirthday = signupUser.birthday.split("-");
  console.log({ fieldsBirthday, length: fieldsBirthday.length });

  if (fieldsBirthday.length !== 3) {
    Swal.fire({
      title: "Error!",
      text: "Formato incorrecto de años  (1990-01-01)",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw new Error("Formato incorrecto de años");
  }

  const yearBithday = parseInt(fieldsBirthday[0]);
  const monthBithday = parseInt(fieldsBirthday[1]);
  const dayBithday = parseInt(fieldsBirthday[2]);

  if (yearBithday < 1960 || yearBithday >= new Date().getFullYear - 4) {
    Swal.fire({
      title: "Error!",
      text: "Está fuera del rango de años.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw new Error(`Está fuera del rango de años (${yearBithday})`);
  }

  if (monthBithday < 1 || monthBithday > 12) {
    Swal.fire({
      title: "Error!",
      text: "Ingrese un mes correcto (01 - 12).",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw new Error("Ingrese un mes correcto");
  }

  if (dayBithday < 1 || dayBithday > 31) {
    Swal.fire({
      title: "Error!",
      text: "Ingrese un día de mes correcto.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw new Error("Ingrese un día de mes correcto");
  }
};

function SignupPage() {
  const navigate = useNavigate();

  const [signupUser, setSignupUser] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    address1: "",
    address2: "",
    birthday: "",
    gender: "1",
    ubigeo: "010101",
    phone: "",
  });

  const formSignup = (field, value) => {
    console.log({
      ...signupUser,
      [field]: value,
    });
    setSignupUser({
      ...signupUser,
      [field]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // validacion:
    if (signupUser.confirmPassword !== signupUser.password) {
      // alert("La confirmación de la contraseña no coincide.");
      Swal.fire({
        title: "Error!",
        text: "La confirmación de la contraseña no coincide.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      validation(signupUser);

      const resp = await axios.post(
        `http://localhost:8080/api/usuariosTemporales`,
        {
          nombres: signupUser.name,
          apellidos: signupUser.lastname,
          direccion1: signupUser.address1,
          direccion2: signupUser.address2,
          email: signupUser.email,
          fechaNacimiento: signupUser.birthday,
          genero: {
            idGenero: 1,
          },
          ubigeo: {
            idUbigeo: "010101",
          },
          telefono: signupUser.phone,
          contrasena: signupUser.password,
        }
      );
      console.log({ res: resp.data });

      // Swal.fire({
      //   title: "Enhorabuena songuanda!",
      //   text: "Hemos enviado un código de verificación a tu correo. Úsalo para continuar en el proceso.",
      //   icon: "success",
      //   confirmButtonText: "Ok",
      // });
      navigate("/verification");
    } catch (error) {
      console.log("Error call signup-service:\n", error);
      return;
    }
  };

  return (
    <div className="container">
      <LogoHeader
        style={{
          borderRadius: "50%",
        }}
      />
      <form onSubmit={submitForm}>
        <h2>Registro</h2>
        <label>Nombre</label>
        <input
          type="text"
          value={signupUser.name}
          onChange={(data) => formSignup("name", data.target.value)}
          placeholder="Ingresa tu nombre de usuario"
        />

        <label>Apellidos</label>
        <input
          type="text"
          value={signupUser.lastname}
          onChange={(data) => formSignup("lastname", data.target.value)}
          placeholder="Ingresa tu apellido"
        />

        <label>Primera dirección</label>
        <input
          type="text"
          value={signupUser.address1}
          onChange={(data) => formSignup("address1", data.target.value)}
          placeholder="Ingresa tu primera dirección"
        />

        <label>Dirección alternativa</label>
        <input
          type="text"
          value={signupUser.address2}
          onChange={(data) => formSignup("address2", data.target.value)}
          placeholder="Ingresa tu segunda dirección"
        />

        <label>Fecha de nacimiento (Ejm. 1990-01-01)</label>
        <input
          type="text"
          value={signupUser.birthday}
          onChange={(data) => formSignup("birthday", data.target.value)}
          placeholder="Ingresa tu fecha de nacimiento"
        />

        <label>Teléfono</label>
        <input
          type="text"
          value={signupUser.phone}
          onChange={(data) => formSignup("phone", data.target.value)}
          placeholder="Ingresa tu número de contacto"
        />

        <label>Email</label>
        <input
          type="text"
          value={signupUser.email}
          onChange={(data) => formSignup("email", data.target.value)}
          placeholder="Ingresa tu correo"
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={signupUser.password}
          onChange={(data) => formSignup("password", data.target.value)}
          placeholder="Pon contra"
        />

        <label>Confirmar Contraseña</label>
        <input
          type="password"
          value={signupUser.confirmPassword}
          onChange={(data) => formSignup("confirmPassword", data.target.value)}
          placeholder="Confirma tu contraseña"
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SignupPage;
