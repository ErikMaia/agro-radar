import DispositivoDto from "./dispositivoDto";

// DTO para a estrutura principal
  export default class GateWayDto {
    id?: number;
    nome?: string;
    localizacao?: string;
    dispositivos?: DispositivoDto[]; // Array de dispositivos associados à estrutura
  }
  