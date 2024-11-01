import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { postUsuarioGoogle } from "../../redux/Actions/actions";
import { useNavigate } from "react-router-dom";
import { useVerificarToken } from "../AutenticadorToken/autenticadorToken.jsx";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export default function LoginTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useVerificarToken();

  const respuestaExitosa = async (respuesta) => {
    console.log("log de actions", respuesta);
    await dispatch(
      postUsuarioGoogle({
        name: respuesta.given_name,
        apellido: respuesta.family_name,
        email: respuesta.email,
      })
    );

    let estado = localStorage.getItem("estado");

    if (estado === '"activo"') {
      const isAdmin = localStorage.getItem("isAdmin");
      navigate(isAdmin === "true" ? "/admin-usuarios" : "/");
    } else if (estado === '"eliminar"') {
      Swal.fire({
        title: "Si desea recuperar su cuenta, presione ACEPTAR.",
        icon: "error",
        confirmButtonColor: "#FB350C",
        iconColor: "#FB350C",
      });
      localStorage.removeItem("token");
      navigate("/recuperar-usuario");
    } else if (estado === '"inactivo"') {
      Swal.fire({
        title:
          "Su cuenta se encuentra inactiva, por favor comuníquese con: serenahotel25@gmail.com. Muchas gracias.",
        icon: "error",
        confirmButtonColor: "#FB350C",
        iconColor: "#FB350C",
      });
      localStorage.removeItem("token");
    }
  };

  const respuestaFallida = (error) => {
    console.error("Error en la autenticación de Google:", error);
  };

  return (
    <div className="flex justify-center items-center ">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          respuestaExitosa(decoded);
        }}
        onError={respuestaFallida}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
