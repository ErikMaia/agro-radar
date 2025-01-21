import { PropsWithChildren } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";

export default function MapFragment({ children }: PropsWithChildren) {

    // Constants
    // const DEFAULT_CENTER = [-25.2885, -54.1275];
    const DEFAULT_ZOOM = 13;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl">
                <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
                    <MapContainer
                        center={[-25.2885, -54.1275]}
                        zoom={DEFAULT_ZOOM}
                        style={{ height: "100%", width: "100%" }}
                        // onClick={handleMapClick}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* {dispositivos.map((dispositivo) => (
                      <Marker
                        key={dispositivo.id}
                        position={[-25.2885 + Math.random() * 0.5, -54.1275 + Math.random() * 0.5]}
                        icon={icon}
                      >
                        <Popup>
                          <MapFragment 
                            dispositivoNome={dispositivo.localizacao!} 
                            id={dispositivo.id!} 
                            tipoSensor={dispositivo.tipoSensor || 'default'} // Add default value
                          />
                        </Popup>
                      </Marker>
                    ))} */}
                        {children??<></>}
                    </MapContainer>
                </div>
                {/* <CoordinatesDisplay /> */}
            </div>
        </div>)

}