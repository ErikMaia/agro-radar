import DispositivoDto from "@/dto/dispositivoDto";
import GateWayDto from "@/dto/gatewayDto";
import LoginDto from "@/dto/loginDto";
import LoginResponseDto from "@/dto/loginResponseDto";
import SensorDto from "@/dto/sensorDto";
import axios from "axios";


class RepositoryApi {
    private readonly baseUrl: string;
    private readonly loginUrl: string;
    private readonly sensorUrl: string;
    private readonly gatewayUrl: string;
    private readonly dispositivoUrl: string;

    constructor() {
        this.baseUrl = "http://localhost:8080/api";
        this.loginUrl = `${this.baseUrl}/auth/login`;
        this.sensorUrl = `${this.baseUrl}/sensores`;
        this.gatewayUrl = `${this.baseUrl}/gateways`;
        this.dispositivoUrl = `${this.baseUrl}/dispositivos`;
    }

    private readonly getData = async (query: string) => {
        try {
            const { data } = await axios.get(query);
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            return null; // Ou [] dependendo do retorno esperado
        }
    };


    public getLogin = async (email: string, pass: string): Promise<LoginResponseDto> => {
        const body: LoginDto = new LoginDto(email, pass);
        console.log(body, "body");
        const data = await axios.post(this.loginUrl, body, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
        });
        console.log(data);
        console.log(data.data);
        return data.data;
    }

    public async createSensor(sensor: SensorDto) {
        const response = await axios.post(this.sensorUrl, sensor,);
        return response;
    }
    public getOneSensor = async (id: number) => {
        const data: SensorDto = await this.getData(`${this.sensorUrl}/${id}`);
        return data;
    }
    public getAllSensors = async () => {
        const data: SensorDto[] = await this.getData(`${this.sensorUrl}`);
        return data;
    }

    public async createGateway(gateway: GateWayDto) {
        return await axios.post(this.gatewayUrl, gateway, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        }
        )
    }

    public async getOneGateway(id: number) {
        const data: GateWayDto = await this.getData(`${this.gatewayUrl}/${id}`);
        return data;
    }

    public async getAllGateways() {
        const data: GateWayDto[] = await this.getData(`${this.gatewayUrl}`);
        return data;
    }

    public async getAllDispositivo() {
        const data: DispositivoDto[] = await this.getData(`${this.dispositivoUrl}`);
        return data;
    }
    public async getOneDispositivo(id: number) {
        const data: DispositivoDto = await this.getData(`${this.dispositivoUrl}/${id}`);
        return data;
    }
    public async createDispositivo(dispositivo: DispositivoDto) {
        return await axios.post(
            this.dispositivoUrl,
            dispositivo,
            {
                headers:
                {
                    "Content-Type": "application/json",
                    'accept': '*/*'
                }
            }
        );

    }
}
const repository = new RepositoryApi();
export default repository;