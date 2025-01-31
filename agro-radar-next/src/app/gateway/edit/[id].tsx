'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../public/styles/Form.css";
import { useRouter } from "next/navigation";
import { RepositoryApi } from '@/api/repository';

type Props = {
    params: Promise<{
      id: number;
    }>;
  };

export default function EditSensor(props: Readonly<Props>) {
  const router = useRouter();
  const [valor, setValor] = useState(0);
  const [desc, setDesc] = useState("");
  const [tipoSensor, setTipoSensor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [id,setId] = useState<number>(0);
  props.params.then((values)=>{
    setId(values.id);
  }).then(()=>{
    const repository = new RepositoryApi();
    repository.getOneSensor(id).then((response)=>{
        setValor(response.valor!);
        setDesc(response.dispositivoNome!);
        setTipoSensor(response.tipoSensor!);
        setLoading(true);
    })
  });
  
  useEffect(()=>{
    const repository = new RepositoryApi();
    repository.getOneSensor(id).then((response)=>{
        setValor(response.valor!);
        setDesc(response.dispositivoNome!);
        setTipoSensor(response.tipoSensor!);
        setLoading(true);
    })
  },[])

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const sensorData = {
        valor: valor,
        descricao: desc,
        tipoSensor: tipoSensor,
        timestamp: new Date().toISOString()
      };

      const response = await axios.put(
        'http://localhost:8080/api/sensores',
        sensorData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status < 300) {
        alert('Sensor Alterado com sucesso!');
        router.push('/maps');
      } else {
        setError('Erro ao criar sensor');
        console.error('Erro ao salvar sensor:', response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div className="form-card">
        <h1>Edição do Sensor</h1>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <div className="form-field">
          <input
            type="number"
            name="valor"
            id="valor"
            placeholder="Valor"
            onChange={(e) => setValor(Number(e.target.value))}
            value={valor}
            className="input-field"
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="desc"
            id="desc"
            placeholder="Descrição"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="input-field"
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="tipoSensor"
            id="tipoSensor"
            placeholder="Tipo do Sensor"
            onChange={(e) => setTipoSensor(e.target.value)}
            value={tipoSensor}
            className="input-field"
          />
        </div>
        <div className="form-field">
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
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </main>
  );
}