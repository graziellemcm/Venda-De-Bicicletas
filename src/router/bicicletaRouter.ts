import express from "express";
import { BicicletaController } from "../controller/BicicletasController";

export const bicicletaRouter = express.Router();

const bikeController = new BicicletaController();

bicicletaRouter.post("/create", bikeController.cadastrar);
bicicletaRouter.put("/:id/price", bikeController.editarPreco);
bicicletaRouter.delete("/:id/sell", bikeController.venda);
bicicletaRouter.get("/", bikeController.listarBicicletas);
bicicletaRouter.get("/filter/cor", bikeController.filtrarCor);
bicicletaRouter.get("/filter/preco", bikeController.filtrarPreco);