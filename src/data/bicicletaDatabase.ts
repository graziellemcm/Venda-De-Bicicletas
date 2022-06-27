import { Bicicletatype } from "../model/Bicicleta";
import { BaseDatabase } from "./BaseDatabase";


export class BicicletaDatabase extends BaseDatabase {

  public create = async (
    bicicletas: Bicicletatype
  ) => {
    await BaseDatabase.connection()
      .insert({
        id: bicicletas.id,
        cor: bicicletas.cor,
        num_marchas: bicicletas.num_marchas,
        marca: bicicletas.marca,
        modelo: bicicletas.modelo,
        preco: bicicletas.preco
      })
      .into("Bicicletas");
  }

  public editprice = async (novopreco: number, id: string) => {
    await BaseDatabase.connection()
      .update({
        preco: novopreco,
      })
      .where("id", id)
      .into("Bicicletas");
    return novopreco;
  };
  public saleitem = async (id: string) => {
    await BaseDatabase.connection()
      .delete("id")
      .from("Bicicletas")
      .where("id", id);
  };
  public getBikes = async (offset: number) => {
    const bicicletas = await BaseDatabase.connection()
      .select("*")
      .from("Bicicletas")
      .limit(10)
      .offset(offset)

    return bicicletas
  }
  public Filter = async (filter: string) => {

    const listfilter = await BaseDatabase.connection()
      .select("*")
      .from("Bicicletas")
      .where("Cor" ,"like", `%${filter}%`)

    return listfilter
  }
  public Filterprice = async (filter: number) => {

    const listfilter = await BaseDatabase.connection()
      .select("*")
      .from("Bicicletas")
      .where("Preco" , filter)

    return listfilter
  }
}