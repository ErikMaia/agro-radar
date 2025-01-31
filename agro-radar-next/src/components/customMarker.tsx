import Link from "next/link";
import { Marker, Popup } from "react-leaflet";


interface CustomMarkerProps{
    href: string; 
    listAllCharacter: string[];
}
export default function CustomMarker({href, listAllCharacter}:CustomMarkerProps) {
    return <Marker position={[0, 0]} >
        <Popup className="w-8 overflow-auto">
            <Link href={href}>
            <ul className='list-none'>
                {listAllCharacter.map(
                    (character: string) => (<li key={character}>{character}</li>)
                )}
            </ul>
            </Link>
        </Popup>
    </Marker>
}