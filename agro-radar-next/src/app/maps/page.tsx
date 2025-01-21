// "use client";

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import { Marker, Popup, TileLayer } from "react-leaflet";
// import MapFragment from "@/components/mapfragment";
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import axios from "axios";
// import { DispositivoDto } from "@/dto/gatway";
// import { LeafletMouseEvent } from 'leaflet';

// // Dynamic import of MapContainer
// const Map = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { 
//   ssr: false 
// });

// // Constants
// const DEFAULT_CENTER = [-25.2885, -54.1275];
// const DEFAULT_ZOOM = 13;

// interface ICoordinate {
//   lat: number;
//   lng: number;
// }

// export default function Home() {
//   const [coordinates, setCoordinates] = useState<ICoordinate>({ lat: 0, lng: 0 });
//   const [dispositivos, setDispositivos] = useState<DispositivoDto[]>([]);

//   const icon = new L.Icon({
//     iconUrl: '/pin.png',
//     iconSize: [32, 64],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = "http://localhost:3000/login";
//       return;
//     }

//     const fetchDispositivos = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/dispositivos', {
//           headers: {
//             "accept": "*/*",
//             Authorization: `Bearer ${token}`,
//           }
//         });
//         setDispositivos(response.data);
//       } catch (error) {
//         console.error("Erro ao carregar dispositivos", error);
//       }
//     };

//     fetchDispositivos();
//   }, []);

//   // Handler for map clicks
//   const handleMapClick = (event: LeafletMouseEvent) => {
//     const { lat, lng } = event.latlng;
//     setCoordinates({
//       lat: parseFloat(lat.toFixed(6)),
//       lng: parseFloat(lng.toFixed(6)),
//     });
//   };

//   // Coordinates display component
//   const CoordinatesDisplay = () => (
//     <div className="mt-4 text-center">
//       {coordinates.lat !== 0 && coordinates.lng !== 0 ? (
//         <p className="text-lg text-gray-700">
//           Coordenadas selecionadas: <br />
//           Latitude: {coordinates.lat} <br />
//           Longitude: {coordinates.lng}
//         </p>
//       ) : (
//         <p className="text-lg text-gray-700">
//           Clique no mapa para obter as coordenadas.
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-4xl">
//         <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
//           <Map
//             center={DEFAULT_CENTER}
//             zoom={DEFAULT_ZOOM}
//             style={{ height: "100%", width: "100%" }}
//             onClick={handleMapClick}
//             scrollWheelZoom={true}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {dispositivos.map((dispositivo) => (
//               <Marker
//                 key={dispositivo.id}
//                 position={[-25.2885 + Math.random() * 0.5, -54.1275 + Math.random() * 0.5]}
//                 icon={icon}
//               >
//                 <Popup>
//                   <MapFragment 
//                     dispositivoNome={dispositivo.localizacao!} 
//                     id={dispositivo.id!} 
//                     tipoSensor={dispositivo.tipoSensor || 'default'} // Add default value
//                   />
//                 </Popup>
//               </Marker>
//             ))}
//           </Map>
//         </div>
//         <CoordinatesDisplay />
//       </div>
//     </div>
//   );
// }