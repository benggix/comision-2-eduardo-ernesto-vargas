import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRouter = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // SI EL USER NO TIENEN AUTENTICACION, LO MANDAMOS A L A PAG PRINCIPAL
    if (auth === null) {
      navigate("/");
    }
  }, [auth, navigate]);

  if (auth === undefined) return <p> Cargando los datos...</p>;

  return <Outlet />;
};
