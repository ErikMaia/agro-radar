'use client'
import { RepositoryApi } from "@/api/repository";
import CustomMarker from "@/components/customMarker";
import MapFragment from "@/components/mapfragment";
import SensorDto from "@/dto/sensorDto";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sensor() {
    const [sensors, setSensor] = useState<SensorDto[]>([])
    useEffect(()=>{
        const repository = new RepositoryApi()
        repository.getAllSensors()
            .then((value)=>{
                console.log(value)
                setSensor(value)
            })
    },[])

    return (<>
        <MapFragment>
            {sensors.map((value,index)=>{
                return <CustomMarker 
                    key={index}
                    href={`sensors/${index}`} 
                    listAllCharacter={[
                        `index: ${value.id ?? ''}`, 
                        `Nome do Dispositivo: ${value.dispositivoNome??''}`,
                        `tipo do sensor: ${value.tipoSensor??''}`]} 
                    />
            })}
        </MapFragment>

        <Link href={'create'}>
            <button type="button" className="bg-slate-500 font-sans text-gray-50">Criar um Novo Sensor</button>
        </Link>
    </>)
}