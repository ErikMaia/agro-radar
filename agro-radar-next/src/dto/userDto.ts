export default class DtoUser{
    public id:number;
    public nome: string;
    public email: string;
    public senha: string;
    constructor(id:number,
        nome: string,
        email: string,
        senha:string){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}