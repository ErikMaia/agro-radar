'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "@/../public/styles/Form.css";
import { useRouter, useParams } from "next/navigation";

export default function EditDispositivo() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Obtém o parâmetro id da rota

  // Estados para os dados do dispositivo
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  // Estados para Gateway e Dispositivos (exibidos para referência)
  const [selectedGateway, setSelectedGateway] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const gatewayOptions = [
    { id: 1, nome: "Gateway 1", localizacao: "Local 1", dispositivos: ["Dispositivo A", "Dispositivo B"] },
    { id: 2, nome: "Gateway 2", localizacao: "Local 2", dispositivos: ["Dispositivo C"] }
  ];

  // Estados para os sensores (carregados via API) e os sensores selecionados
  const [sensorsOptions, setSensorsOptions] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);

  // Estados de loading e error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Busca os dados do dispositivo pelo id
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:8080/api/dispositivos/${id}`)
      .then(response => {
        const data = response.data;
        setNome(data.nome);
        setLocalizacao(data.localizacao);
        if (data.gateway) {
          // Converte para string para compatibilidade com o value do select
          setSelectedGateway(data.gateway.id.toString());
          setSelectedDevices(data.gateway.dispositivos);
        }
        if (data.sensores) {
          // Mapeia os sensores para seus ids em string
          setSelectedSensors(data.sensores.map(sensor => sensor.id.toString()));
        }
      })
      .catch(err => {
        console.error("Erro ao carregar dispositivo:", err);
        setError("Erro ao carregar dispositivo");
      });
  }, [id]);

  // Carrega os sensores disponíveis via API
  useEffect(() => {
    axios.get('http://localhost:8080/api/sensores')
      .then(response => {
        setSensorsOptions(response.data);
      })
      .catch(err => {
        console.error("Erro ao carregar sensores:", err);
      });
  }, []);

  // Quando o gateway é alterado, limpa os dispositivos selecionados
  useEffect(() => {
    setSelectedDevices([]);
  }, [selectedGateway]);

  // Função para atualizar os dados via PUT
  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const gatewayObj = gatewayOptions.find(g => g.id === Number(selectedGateway));
      
      // Monta o objeto conforme a estrutura esperada
      const data = {
        nome,
        localizacao,
        gateway: gatewayObj ? {
          ...gatewayObj,
          dispositivos: selectedDevices
        } : null,
        sensores: selectedSensors.map(sensorId => {
          const sensor = sensorsOptions.find(s => s.id === Number(sensorId));
          return sensor ? {
            id: sensor.id,
            tipoSensor: sensor.tipoSensor,
            valor: sensor.valor,
            timestamp: new Date().toISOString()
          } : null;
        }).filter(s => s !== null)
      };

      const response = await axios.put(
        `http://localhost:8080/api/dispositivos/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert('Dispositivo atualizado com sucesso!');
        router.push('/maps');
      } else {
        setError('Erro ao atualizar dispositivo');
        console.error('Erro ao atualizar dispositivo:', response.status);
      }
    } catch (err) {
      setError('Erro ao atualizar dispositivo');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>Editar Dispositivo</h1>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Seção de Dados do Dispositivo */}
        <div className="form-section" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h2>Dados do Dispositivo</h2>
          <div className="form-field" style={{ marginBottom: '10px' }}>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="input-field"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div className="form-field" style={{ marginBottom: '10px' }}>
            <label htmlFor="localizacao">Localização:</label>
            <input
              type="text"
              id="localizacao"
              placeholder="Localização"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="input-field"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>

        {/* Seção de Gateway e Dispositivos */}
        <div className="form-section" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h2>Gateway e Dispositivos</h2>
          <div className="form-field" style={{ marginBottom: '10px' }}>
            <label htmlFor="gateway">Selecione o Gateway:</label>
            <select
              id="gateway"
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
              className="input-field"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Selecione um Gateway</option>
              {gatewayOptions.map(gateway => (
                <option key={gateway.id} value={gateway.id}>
                  {gateway.nome} - {gateway.localizacao}
                </option>
              ))}
            </select>
          </div>
          {selectedGateway && (
            <div className="form-field" style={{ marginBottom: '10px' }}>
              <label htmlFor="devices">Dispositivos do Gateway:</label>
              <select
                id="devices"
                multiple
                value={selectedDevices}
                onChange={(e) => {
                  const options = e.target.options;
                  const values = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      values.push(options[i].value);
                    }
                  }
                  setSelectedDevices(values);
                }}
                className="input-field"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                {gatewayOptions.find(g => g.id === Number(selectedGateway))?.dispositivos.map((device, index) => (
                  <option key={index} value={device}>
                    {device}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Seção de Sensores */}
        <div className="form-section" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h2>Sensores</h2>
          <div className="form-field" style={{ marginBottom: '10px' }}>
            <label htmlFor="sensores">Selecione os Sensores:</label>
            <select
              id="sensores"
              multiple
              value={selectedSensors}
              onChange={(e) => {
                const options = e.target.options;
                const values = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    values.push(options[i].value);
                  }
                }
                setSelectedSensors(values);
              }}
              className="input-field"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              {sensorsOptions.map(sensor => (
                <option key={sensor.id} value={sensor.id}>
                  {sensor.tipoSensor}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão de Salvar */}
        <div className="form-field" style={{ textAlign: 'center' }}>
          <button
            onClick={handleSave}
            disabled={loading}
            className="submit-button"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontSize: '16px'
            }}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </main>
  );
}
