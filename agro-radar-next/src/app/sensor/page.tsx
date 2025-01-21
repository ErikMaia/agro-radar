import MapFragment from "@/components/mapfragment";
import Link from "next/link";

export default function Sensor() {
    return (<>
        <MapFragment>
            <></>
        </MapFragment>

        <Link href={'create'}>
            <button type="button" className="bg-slate-500 font-sans text-gray-50">Criar um Novo Sensor</button>
        </Link>
    </>)
}