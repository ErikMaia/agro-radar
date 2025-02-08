'use client'
import { useState } from 'react';
import "../../../../public/styles/Form.css";
import { useRouter } from "next/navigation";
import GateWayDto from '@/dto/gatewayDto';
import repository from '@/api/repository';

export default function CreateSensor() {
  const router = useRouter();
  // dispositivo,localizacao,nome
  const [dispositivo, setDispsitivo] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [nome, setNome] = useState('')

  const handleSave = async () => {
    try {
      repository.createGateway({localizacao, nome})
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const gateway: GateWayDto = { localizacao, nome }
      repository.createGateway(gateway);
      const response = await repository.createGateway(gateway);

      if (response.status === 201) {
        alert('Sensor criado com sucesso!');
        router.push('/gateway');
      } else {
        console.error('Erro ao salvar sensor:', response.status);
      }
    }
    finally{
      console.log('finally')
    }
  };

  return (
    <main className="container">
      <form className='flex-col w-auto h-auto' onSubmit={(e)=>e.preventDefault()}>
        <input type='text' placeholder='nome' value={nome} id='nome' onChange={(e) => { setNome(e.target.value) }} />
        <input type='text' placeholder='dispositivo' value={dispositivo} id='dispositivo' onChange={(e) => { setDispsitivo(e.target.value) }} />
        <input type='text' placeholder='localização' value={localizacao} id='localizacao' onChange={(e) => { setLocalizacao(e.target.value) }} />
        <button onClick={(e) => {
          e.preventDefault();
          handleSave()
        }}>Salvar</button>
      </form>
    </main>
  );
}