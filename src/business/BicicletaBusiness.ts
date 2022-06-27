import { BicicletaDatabase } from "../data/bicicletaDatabase";
import { Bicicletatype } from "../model/Bicicleta";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const bicicletaDB = new BicicletaDatabase();
const authenticator = new TokenGenerator();
const idGenerator = new IdGenerator();

export class BicicletaBusiness {
  cadastrar = async (
    cor: string,
    num_marchas: number,
    marca: string,
    modelo: string,
    preco: number
  ) => {
    try {
      if (!cor || !num_marchas || !marca || !modelo || !preco) {
        throw new Error("Por favor preencha todos os campos");
      }

      const id = idGenerator.generateId();

      const atributos: Bicicletatype = {
        id,
        cor,
        num_marchas,
        marca,
        modelo,
        preco,
      };

      await bicicletaDB.create(atributos);

      const token = authenticator.generateToken({ id });

      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  editarpreco = async (novopreco: number, id: string) => {
    if (!id) {
      throw new Error("Número de ID da bicicleta inválido!");
    }

    const valor = await bicicletaDB.editprice(novopreco, id);

    return valor;
  };

  vender = async (id: string) => {
    if (!id) {
      throw new Error("Número de ID do produto inválido!");
    }

    const valor = await bicicletaDB.saleitem(id);

    return valor;
  };

  listaDeBicicletas = async (pagina: number) => {
    if (!pagina) {
      throw new Error("Número de página inválida.");
    }
    let size = 10;
    let offset = size * (pagina - 1);

    const bicicletas = await bicicletaDB.getBikes(offset);

    return bicicletas;
  };
  filtrarCor = async (filter: string) => {
    if (!filter) {
      throw new Error("Pesquisa inválida!");
    }

    const bicicletaslistfilter = await bicicletaDB.Filter(filter);
    if (bicicletaslistfilter.length < 1) {
      throw new Error("Não foi econtrada nenhuma bicicleta com esta cor!");
    }
    return bicicletaslistfilter;
  };
  filtrarPreco = async (filter: number) => {
    if (!filter) {
      throw new Error("Pesquisa inválida!");
    }

    const bicicletaslistfilter = await bicicletaDB.Filterprice(filter);
    if (bicicletaslistfilter.length < 1) {
      throw new Error("Não foi obtido nenhuma resposta!");
    }
    return bicicletaslistfilter;
  };
}
