"use client"; // Certifique-se de que este código só será executado no cliente

import { useEffect } from "react";

export default function Home() {

  // useEffect para garantir que o código de redirecionamento será executado no cliente
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // Se o cookie `token` existir, redireciona para a página de mapas
      window.location.href = "/maps";
    } else {
      // Se o cookie `token` não existir, redireciona para a página de login
      window.location.href = "/login";
    }
  }, []); // A dependência foi removida, pois não há necessidade de observar `router` diretamente

  return <div>Loading...</div>; // Exibe algo enquanto o redirecionamento ocorre
}
