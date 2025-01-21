"use client"
import DtoUser from "@/dto/userDto";
import axios from "axios";
import { randomInt } from "crypto";
import { useState, useRef } from "react";

export default function Register() {
  const email = useRef(null);
  const pass = useRef(null);
  const confirmPass = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const emailValue = email.current!.value;
    const passValue = pass.current!.value;
    const confirmPassValue = confirmPass.current!.value;

    // Verifica se as senhas coincidem
    if (passValue !== confirmPassValue) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError(""); // Limpa qualquer erro anterior

    // Dados a serem enviados para a API de registro
    const userData:DtoUser = {
      email: emailValue,
      senha: passValue,
      nome: emailValue,
      id: randomInt(1000),
    };

    try {
      console.log(userData)
      // Envia os dados para o backend (Spring Boot)
      const response = await axios.post("http://localhost:8080/api/usuarios", 
        userData,{headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }});

      if (response.status!=200) {
        const errorData = response.data;
        throw new Error(errorData.message || "Erro ao registrar");
      }

      // Se o registro for bem-sucedido, redireciona o usuário
      window.location.href = "/login"; // Redireciona para a página de login após o registro

    } catch (error) {
      setError(error.message || "Erro desconhecido ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Crie sua Conta AgroRadar</h1>
        </div>

        <form onSubmit={handleRegister}>
          {/* Campo de Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              ref={email}
              required
            />
          </div>

          {/* Campo de Senha */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              ref={pass}
              required
            />
          </div>

          {/* Campo de Confirmação de Senha */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              ref={confirmPass}
              required
            />
          </div>

          {/* Exibição de erros */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* Botão de Registro */}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Criar Conta"}
          </button>
        </form>

        {/* Link para Termos e Privacidade */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Ao se registrar, você concorda com os{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Termos de Serviço
          </a>{' '}
          e a{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Política de Privacidade
          </a>.
        </div>

        {/* Link para a página de login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
