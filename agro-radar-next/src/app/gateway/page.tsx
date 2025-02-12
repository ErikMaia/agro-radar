'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

import repository from "@/api/repository";
import CustomMarker from "@/components/customMarker";
import MapFragment from "@/components/mapfragment";
import GateWayDto from "@/dto/gatewayDto";

export default function GatewayPage() {
  const [data, setData] = useState<GateWayDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await repository.getAllGateways();
        setData(response ?? []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
        {typeof(data)}
      <MapFragment>
        {data.map((value) => (
          <CustomMarker
            key={value.id} // Usando `id` como chave única
            href={`gateway/${value.id}`}
            listAllCharacter={[
              `ID: ${value.id ?? ''}`,
              `Nome do Dispositivo: ${value.nome ?? ''}`,
              `Localização do Dispositivo: ${value.localizacao ?? ''}`
            ]}
          />
        ))}
      </MapFragment>

      <Link href="create">
        <button type="button" className="bg-slate-500 font-sans text-gray-50">
          Criar um Novo Sensor
        </button>
      </Link>
    </>
  );
}
