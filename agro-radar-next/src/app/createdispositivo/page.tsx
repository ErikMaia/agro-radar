"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../../../public/styles/Form.css";
import Sensor from '../../dto/sensorDto';

const DEFAULT_CENTER = [-25.2885, -54.1275]; // Mesmas coordenadas do mapa

export default function CreateDevice() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [selectedSensors, setSelectedSensors] = useState<Sensor[]>([]);
  const [availableSensors, setAvailableSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Buscar sensores disponíveis
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/sensores', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        });

        setAvailableSensors(response.data);
      } catch (err) {
        console.error('Erro ao buscar sensores:', err);
        setError('Erro ao carregar sensores disponíveis');
      }
    };

    fetchSensors();
  }, [router]);

  // Gerar localização aleatória próxima ao centro
  const generateRandomLocation = () => {
    const randomLat = DEFAULT_CENTER[0] + (Math.random() - 0.5) * 0.05; // Variação de ±0.05 graus
    const randomLng = DEFAULT_CENTER[1] + (Math.random() - 0.5) * 0.05;
    return {
      latitude: randomLat.toFixed(6),
      longitude: randomLng.toFixed(6)
    };
  };

  const handleSensorToggle = (sensor: Sensor) => {
    if (selectedSensors.find(s => s.id === sensor.id)) {
      setSelectedSensors(selectedSensors.filter(s => s.id !== sensor.id));
    } else {
      setSelectedSensors([...selectedSensors, sensor]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const randomLocation = generateRandomLocation();

      const deviceData = {
        id: Math.floor(Math.random() * 1000), // ID aleatório
        nome: nome,
        localizacao: localizacao,
        latitude: randomLocation.latitude,
        longitude: randomLocation.longitude,
        gateway: {
          id: Math.floor(Math.random() * 1000), // ID aleatório para o gateway
          nome: "Gateway-" + nome,
          localizacao: localizacao,
          dispositivos: []
        },
        sensores: selectedSensors
      };

      const response = await axios.post(
        'http://localhost:8080/api/dispositivos',
        deviceData,
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert('Dispositivo criado com sucesso!');
        router.push('/maps');
      }
      else {

        setError('Erro ao criar dispositivo');
        console.error('Erro ao salvar dispositivo:');

      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="form-card">
        <h1>Criar Dispositivo</h1>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <div className="form-field">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Dispositivo"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            className="input-field"
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="localizacao"
            placeholder="Localização"
            onChange={(e) => setLocalizacao(e.target.value)}
            value={localizacao}
            className="input-field"
          />
        </div>

        <div className="form-field">
          <h3>Sensores Disponíveis</h3>
          <div className="sensors-list">
            {availableSensors.map((sensor) => (
              <div key={sensor.id} className="sensor-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSensors.some(s => s.id === sensor.id)}
                    onChange={() => handleSensorToggle(sensor)}
                  />
                  {sensor.tipoSensor} - Valor: {sensor.valor}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-field">
          <button
            onClick={handleSave}
            disabled={loading || !nome || !localizacao}
            className="submit-button"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </main>
  );
}