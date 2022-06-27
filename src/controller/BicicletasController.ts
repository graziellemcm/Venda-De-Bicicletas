import { Request, Response } from "express";
import { BicicletaBusiness } from "../business/BicicletaBusiness";
import { BicicletaInputDTO, EditInputDTO } from "../model/Bicicleta";

const bicicletaBusiness = new BicicletaBusiness();

export class BicicletaController {
  cadastrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cor, num_marchas, marca, modelo, preco } = req.body;

      const input: BicicletaInputDTO = {
        cor,
        num_marchas,
        marca,
        modelo,
        preco,
      };

      const token = await bicicletaBusiness.cadastrar(
        input.cor,
        input.num_marchas,
        input.marca,
        input.modelo,
        input.preco
      );

      res.status(200).send({ "Bicicleta criada com sucesso": token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  editarPreco = async (req: Request, res: Response) => {
    try {
      const novopreco = Number(req.body.novopreco);
      const id = req.params.id as string;
      const input: EditInputDTO = {
        novopreco,
      };

      const preco = await bicicletaBusiness.editarpreco(input.novopreco, id);

      res.status(200).send({ NovoPreco: preco });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  venda = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await bicicletaBusiness.vender(id);

      res.status(200).send("Produto vendido com sucesso!");
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  listarBicicletas = async (req: Request, res: Response) => {
    try {
      let pagina = Number(req.query.pagina);

      const bicicletas = await bicicletaBusiness.listaDeBicicletas(pagina);

      res.status(200).send({ Bicicletas: bicicletas });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
  filtrarCor = async (req: Request, res: Response) => {
    try {
      const cor = req.query.cor as string;

      const bicicletas = await bicicletaBusiness.filtrarCor(cor);

      res.status(200).send({ Filtro: bicicletas });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
  filtrarPreco = async (req: Request, res: Response) => {
    try {
      const preco = Number(req.query.preco);

      const bicicletas = await bicicletaBusiness.filtrarPreco(preco);

      res.status(200).send({ Filtro: bicicletas });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };
}
