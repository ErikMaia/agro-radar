'use client'
import Link from "next/link";
import { Marker, Popup } from "react-leaflet";

interface CustomMarkerProps {
  href: string; 
  listAllCharacter: string[];
}

export default function CustomMarker({ href, listAllCharacter }: Readonly<CustomMarkerProps>) {
  const lat = (Math.random() - 0.5) * (10 / 40000) - 25.2885;
  const lon = (Math.random() - 0.5) * (10 / 40000) - 54.1275;

  return (
    <Marker position={[lat, lon]}>
      <Popup className="w-8 overflow-auto">
        <Link href={href}>
          <ul className="list-none">
            {listAllCharacter.map((character: string) => (
              <li key={character}>{character}</li>
            ))}
          </ul>
        </Link>
      </Popup>
    </Marker>
  );
}
