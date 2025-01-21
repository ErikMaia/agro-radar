import GateWayDto from "@/dto/gatewayDto";
import LoginDto from "@/dto/loginDto";
import SensorDto from "@/dto/sensorDto";
import axios from "axios";

export class RepositoryApi{
    private readonly baseUrl: string;
    private readonly loginUrl: string;
    private readonly sensorUrl: string;
    private readonly gatewayUrl: string;

    constructor(){
        this.baseUrl = "localhost:3000/api";
        this.loginUrl = 'http://localhost:8080/api/auth/login';
        this.sensorUrl = `${this.baseUrl}/sensores`;
        this.gatewayUrl = `${this.baseUrl}/gateway`
    }

    private readonly getData = async (query:string) => {
        const data = await fetch(query)
        const result = await data.json();
        return result;
    }
    
    public getLogin = async (email: string, pass: string) =>{
        const body: LoginDto = {email, senha: pass};
        const data = await axios.post(this.loginUrl,body);
        return data.data;
    }

    /**
     * createSensor
     */
    public async createSensor(sensor: SensorDto) {
        const response = await axios.post(this.sensorUrl,sensor,)
        return response;
    }
    public getOneSensor =  async (id:number) =>{
        const data:SensorDto = await this.getData(`${this.sensorUrl}/${id}`);
        return data;
    }
    public getAllSensors = async () => {
        const data:SensorDto[] = await this.getData(`${this.sensorUrl}`);
        return data;
    }

    /**
     * createGateway
     */
    public createGateway(gateway: GateWayDto) {
        return axios.post(this.gatewayUrl,gateway)
    }
    
    /**
     * getOneGateway
     */
    public async getOneGateway() {
        const data:GateWayDto = await this.getData(`${this.gatewayUrl}`);
        return data;
    }

    /**
     * getAllGateways
     */
    public async getAllGateways() {
        const data:GateWayDto[] = await this.getData(`${this.gatewayUrl}`);
        return data;
    }
}