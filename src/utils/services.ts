import "reflect-metadata";
import { container } from "tsyringe";
import { AppDataSource } from "../data-source";
import { EntityManager, Repository } from "typeorm";
import { Account } from "../account/entities/Account";

    export default async function Services() {
        try{
            // register controllers controllers
            container.register<Repository<Account>>(Account.name, {
                useFactory: () => AppDataSource.getRepository(Account),
            });
    
            ///register services
            //   container.register(AccountService, {
            //     useClass: AccountService,
            //   });
        }catch(error){
            console.log("error occured while registering services", error);
        }
    } 

    Services()
  