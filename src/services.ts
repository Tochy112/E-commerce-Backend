import "reflect-metadata";
import { container } from "tsyringe";
import { AppDataSource } from "./data-source";
import { EntityManager, Repository } from "typeorm";
import { Account } from "./account/entities/Account";
import AuthService from "./account/services/AuthService";

export default async function Services() {
    try {
        // register all controllers
        container.register<Repository<Account>>(Account.name, {
            useFactory: () => AppDataSource.getRepository(Account),
        });

        //register all services
        container.register(AuthService.name, AuthService)

    } catch(error) {
        console.error("Error occurred while registering services", error);
    }
}

Services()
  