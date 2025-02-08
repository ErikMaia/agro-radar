import SensorDto from "./gatewayDto";

export default interface DispositivoDto{
    id: number,
    nome: string,
    localizacao: string,
    gatewayId: number,
    gatewayNome: string,
    sensores: SensorDto[]
}