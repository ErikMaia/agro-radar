'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

import repository from "@/api/repository";
import CustomMarker from "@/components/customMarker";
import MapFragment from "@/components/mapfragment";
import DispositivoDto from "@/dto/dispositivoDto";

export default function Dispositivo() {
  const [dispositivos, setDispositivos] = useState<DispositivoDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDispositivos() {
      try {
        const data: DispositivoDto[] = await repository.getAllDispositivo();
        setDispositivos(data);
      } catch (error) {
        console.error("Erro ao buscar dispositivos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDispositivos();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <MapFragment>
        {dispositivos.map((value) => (
          <CustomMarker
            key={value.id}
            href={`dispositivo/${value.id}`}
            listAllCharacter={[
              `Nome: ${value.nome ?? ''}`,
              `Número de sensores: ${value.sensores?.length ?? ''}`,
              `localização: ${value.localizacao}`,
              `nome do gateway: ${value.gatewayNome}`
            ]}
          />
        ))}
      </MapFragment>

      <Link href="/sensor/create">
        <button type="button" className="bg-slate-500 font-sans text-gray-50">
          Criar um Novo Sensor
        </button>
      </Link>
    </>
  );
}
