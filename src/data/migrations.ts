import { BaseDatabase } from "../data/BaseDatabase"

export class Migrations extends BaseDatabase {

   static migrations = (

    ) => {
        BaseDatabase.connection.raw(`
CREATE TABLE IF NOT EXISTS Bicicletas ( 
    id VARCHAR(255) PRIMARY KEY,
    cor VARCHAR(45) NOT NULL,
    num_marchas INT NOT NULL,
    marca VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    preco FLOAT NOT NULL
);

    `)
            .then(() => console.log(
                "Tabela criada!"
            ))
            .catch(error =>
                console.log(error.message)
            )
            .finally(() => {
                BaseDatabase.connection.destroy()
            })
    }
}
Migrations.migrations()