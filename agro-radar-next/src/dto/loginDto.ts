export default class LoginDto{
    public email: string = ""
    public senha: string = ""

    constructor(email:string, senha: string){
        this.email = email;
        this.senha = senha;
    }
}