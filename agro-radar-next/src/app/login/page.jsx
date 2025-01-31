"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = "http://192.168.9:8080/api/auth/login";

// Configuração base do axios
const api = axios.create({
  baseURL: 'http://192.168.9:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '/*'
  }
});

api.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log(formData)

    try {
      const response = await api.post('/api/auth/login', {
        email: formData.email,
        senha: formData.senha
      }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      console.log(response);

      // Se chegou aqui, o login foi bem-sucedido
      const { token } = response.data;

      if (token) {
        // Armazena o token
        localStorage.setItem("token", token);
        
        if (formData.remember) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Configura o token para futuras requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Redireciona para a página de mapas
        router.push("/maps");
      } else {
        throw new Error("Token não recebido do servidor");
      }

    } catch (error) {
      console.error("Erro detalhado:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // O servidor respondeu com um status diferente de 2xx
          setError(error.response.data.message || `Erro ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          // A requisição foi feita mas não houve resposta
          setError("Servidor não respondeu. Verifique sua conexão ou se o servidor está rodando.");
        } else {
          // Erro na configuração da requisição
          setError("Erro ao configurar a requisição. Tente novamente.");
        }
      } else {
        // Erro não relacionado ao Axios
        setError(error.message || "Erro desconhecido ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Verifica se a API está acessível
  useEffect(() => {
    const checkAPI = async () => {
      try {
        await api.options('/api/auth/login');
        console.log('API está acessível');
      } catch (error) {
        console.warn('API não está acessível:', error);
      }
    };

    checkAPI();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Mensagem de debug para desenvolvimento */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-4 p-2 bg-yellow-50 text-yellow-800 text-xs rounded">
            Debug: Tentando conectar em {API_URL}
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">AgroRadar</h1>
          <p className="text-gray-600">Use sua conta AgroRadar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email ou telefone
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entre com seu email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entre com sua senha"
              value={formData.senha}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Lembrar de mim
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-white rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              ${loading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Crie uma
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}