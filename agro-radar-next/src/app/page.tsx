"use client"; // Certifique-se de que este código só será executado no cliente

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  // useEffect para garantir que o código de redirecionamento será executado no cliente
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && token !== '') {
      router.push('/sensor');
    } else {
      // Se o cookie `token` não existir, redireciona para a página de login
      router.push("/login");
    }
  }, []); // A dependência foi removida, pois não há necessidade de observar `router` diretamente

  return <div>Loading...</div>; // Exibe algo enquanto o redirecionamento ocorre
}
