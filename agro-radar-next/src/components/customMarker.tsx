import Link from "next/link";
import { Marker, Popup } from "react-leaflet";

export default function CustonMarker(href: string, listAllCharacter: string[]) {
    return <Marker position={[0, 0]}>
        <Popup>
            <Link href={href}>
            <ul>
                {listAllCharacter.map(
                    (character: string) => (<li key={character}>{character}</li>)
                )}
            </ul>
            </Link>
        </Popup>
    </Marker>
}