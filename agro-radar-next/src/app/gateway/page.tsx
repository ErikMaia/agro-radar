'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import "../../../public/styles/Form.css";
import { DispositivoDto, SensorDto } from '@/dto/gatewayDto';

export default function CreateSensor() {
    const router = useRouter();
    const [tipoSensor, setTipoSensor] = useState("");
    const [valor, setValor] = useState(0);
    const [nomeDispositivo, setNomeDispositivo] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [gateway, setGateway] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleSave = async () => {
      try {
        setLoading(true);
        setError("");
        
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
  
        // Criando sensor com DTO
        const sensor = new SensorDto();
        sensor.tipoSensor = tipoSensor;
        sensor.valor = valor;
        const dispositivo = new DispositivoDto();
        dispositivo.nome = nomeDispositivo;
        dispositivo.localizacao = localizacao;
        dispositivo.gateway = gateway;
        dispositivo.sensores = [sensor];
        
        const response = await axios.post(
          'http://localhost:8080/api/dispositivos',
          dispositivo,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
  
        if (response.status === 201) {
          alert('Dispositivo com sensor criado com sucesso!');
          router.push('/maps');
        } else {
          setError('Erro ao criar dispositivo e sensor');
          console.error('Erro ao salvar:', response.status);
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <main className="container">
        <div className="form-card">
          <h1>Criar Dispositivo e Sensor</h1>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          
          <div className="form-field">
            <input type="text" placeholder="Nome do Dispositivo" value={nomeDispositivo} onChange={(e) => setNomeDispositivo(e.target.value)} className="input-field" />
          </div>
          <div className="form-field">
            <input type="text" placeholder="Localização" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} className="input-field" />
          </div>
          <div className="form-field">
            <input type="text" placeholder="Gateway" value={gateway} onChange={(e) => setGateway(e.target.value)} className="input-field" />
          </div>
          <div className="form-field">
            <input type="text" placeholder="Tipo do Sensor" value={tipoSensor} onChange={(e) => setTipoSensor(e.target.value)} className="input-field" />
          </div>
          <div className="form-field">
            <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(Number(e.target.value))} className="input-field" />
          </div>
          <div className="form-field">
            <button onClick={handleSave} disabled={loading} className="submit-button" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </main>
    );
  }
  