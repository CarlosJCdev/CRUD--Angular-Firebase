//Requerimos de un modelo para poder manejar todos los campos de los formularios
export class HeroeModel{
    id: string;
    nombre: string;
    poder: string;
    vivo: boolean;

    constructor(){
        this.vivo= true;
    }
}