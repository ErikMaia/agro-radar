'use client';
import SensorDto from "@/dto/sensorDto";
import Link from "next/link";
import repository from "../../api/repository";
import { useEffect, useState } from "react";

export default function Sensor() {
  const [sensors, setSensor] = useState<SensorDto[]>([]);
  useEffect(() => {
    repository.getAllSensors().then((value) => {
      console.log(value);
      setSensor(value);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Dispositivo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Valor
                </th>
                <th
                  scope="col"
                  className="relative px-6 py-3"
                >
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sensors.map((value) => (
                <tr key={value.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{value.dispositivoNome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{value.tipoSensor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{value.valor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/sensor/edit/${value.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Link href={"/sensor/create"}>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Criar um Novo Sensor
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
