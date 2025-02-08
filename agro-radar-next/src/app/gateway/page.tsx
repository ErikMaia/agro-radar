import repository from "@/api/repository";
import CustomMarker from "@/components/customMarker";
import MapFragment from "@/components/mapfragment";
import GateWayDto from "@/dto/gatewayDto";
import { GetServerSideProps } from "next";
import Link from "next/link";

type GateWayProp = {
    data: GateWayDto[]
}

export default function GatewayPage({ data = [] }: Readonly<GateWayProp>) {
    return (
        <>
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

            <Link href={'create'}>
                <button type="button" className="bg-slate-500 font-sans text-gray-50">
                    Criar um Novo Sensor
                </button>
            </Link>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await repository.getAllGateways();

        return {
            props: {
                data: response ?? [], // Garante que `data` nunca seja `null`
            },
        };
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return { props: { data: [] } };
    }
};
