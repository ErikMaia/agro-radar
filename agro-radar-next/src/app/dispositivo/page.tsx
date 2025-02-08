import repository from "@/api/repository"
import CustomMarker from "@/components/customMarker"
import MapFragment from "@/components/mapfragment"
import DispositivoDto from "@/dto/dispositivoDto"
import { GetServerSideProps } from 'next'
import Link from "next/link"

type DispositivoProps = {
    dispositivo: DispositivoDto[]
}

export const getServerSideProps:GetServerSideProps=(async () => {
    
    const dispositivo: DispositivoDto[] = await repository.getAllDispositivo()
    return { props: {dispositivo}}
})

export default function Dispositivo({dispositivo}:Readonly<DispositivoProps>) {
    return <>         <MapFragment>
        {dispositivo.map((value)=>{
            return <CustomMarker 
                key={value.id}
                href={`dispositivo/${value.id}`} 
                listAllCharacter={[
                    `Nome: ${value.nome ?? ''}`, 
                    `Número de sensores: ${value.sensores.length??''}`,
                    `localização: ${value.localizacao}`,
                    `nome do gateway: ${value.gatewayNome}`
                ]} 
                />
        })}
    </MapFragment>

    <Link href={'/sensor/create'}>
        <button type="button" className="bg-slate-500 font-sans text-gray-50">Criar um Novo Sensor</button>
    </Link></>
}