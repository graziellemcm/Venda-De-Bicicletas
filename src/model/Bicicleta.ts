export interface BicicletaInputDTO {

    cor: string;
    num_marchas: number;
    marca: string;
    modelo: string;
    preco: number
  }
  
  export type Bicicletatype = {
    id: string,
    cor: string,
    num_marchas: number,
    marca: string,
    modelo: string,
    preco: number
  }
  export interface EditInputDTO {
    novopreco: number;
  }
  export class Bicicleta{
    constructor(
  
       private id: string,
       private cor: string,
       private num_marchas: number,
       private marca: string,
       private modelo: string,
       private preco: number
    ) { }
  
    getId() {
      return this.id;
    }
  
    getcor() {
      return this.cor;
    }
  
    getnum_marchas() {
      return this.num_marchas;
    }
    getmarca() {
      return this.marca;
    }
    getmodelo() {
      return this.modelo;
    }
    getpreco() {
      return this.preco;
    }
    
  
    static toShowModel(data: any): Bicicleta {
      return new Bicicleta(
        data.id,
        data.cor,
        data.num_marchas,
        data.marca,
        data.modelo,
        data.preco
      );
    }
  }