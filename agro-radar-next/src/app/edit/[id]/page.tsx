"use client";

import { RepositoryApi } from "@/api/repository";
import SensorDto from "@/dto/sensorDto";
import { useEffect, useState } from "react";

interface EditProps {
  Id: number;
}
export default function Edit({ Id }: Readonly<EditProps>) {

  const [id, setId] = useState(0);
  const [desc, setDesc] = useState("");
  const [tipoSensor, setTipoSensor] = useState("");
  const repository: RepositoryApi = new RepositoryApi();

  useEffect(() => {
    repository.getOneSensor(Id).then((sensor: SensorDto) => {
      setDesc(sensor.dispositivoNome??'');
      setId(sensor.id??0);
      setTipoSensor(sensor.tipoSensor??'');
    });
  }, []); // Colocamos 'id' no array de dependências

  const handleSave = () => {
    // Aqui você pode adicionar uma função para salvar os dados ou enviar para a API
    console.log("Salvando os dados", { id, desc, tipoSensor });
  };

  return (
    <main>
      <div>
        <label htmlFor="valor">Valor</label>
        <input
          type="number"
          name="valor"
          id="valor"
          onChange={(e) => setId(Number(e.target.value))}
          value={id}
        />
      </div>

      <div>
        <label htmlFor="desc">Descrição</label>
        <input
          type="text"
          name="desc"
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </div>

      <div>
        <label htmlFor="tipoSensor">Tipo de Sensor</label>
        <input
          type="text"
          name="tipoSensor"
          id="tipoSensor"
          onChange={(e) => setTipoSensor(e.target.value)}
          value={tipoSensor}
        />
      </div>

      <div>
        <input
          type="button"
          value="Salvar"
          onClick={handleSave} // Definir uma ação ao clicar no botão
        />
      </div>
    </main>
  );
}
