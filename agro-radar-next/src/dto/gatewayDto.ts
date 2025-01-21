// DTO para Sensor
export class SensorDto {
    id?: number;
    tipoSensor?: string;
    valor?: number;
    timestamp?: string; // Pode ser um Date ou string dependendo do formato de uso
  }
  
  // DTO para Dispositivo
  export class DispositivoDto {
    id?: number;
    nome?: string;
    localizacao?: string;
    gateway?: string;
    sensores?: SensorDto[]; // Array de sensores associados ao dispositivo
  }
  
  // DTO para a estrutura principal
  export default class GateWayDto {
    id?: number;
    nome?: string;
    localizacao?: string;
    dispositivos?: DispositivoDto[]; // Array de dispositivos associados à estrutura
  }
  