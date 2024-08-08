import { AppDataSource } from "../../data-source"
import { NextFunction, Request, Response } from "express"
import { Account } from "../entities/Account"
import { Repository } from "typeorm"
import { inject, injectable } from "tsyringe";

@injectable()
export class AccountController {
    
    constructor(
        @inject(Account.name) private accountRepository: Repository<Account>,
        
    ) {}
        
    async all(request: Request, response: Response, next: NextFunction) {
        const users = await this.accountRepository.find()
        
        return response.status(200).json({data: users}); 
    }
    

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.accountRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, username, email, password, role } = request.body;

        const user = this.accountRepository.create({
            firstName,
            lastName,
            username,
            email,
            password,
            role
        })

        await this.accountRepository.save(user)

        return response.status(201).json({data: user})
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.accountRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.accountRepository.remove(userToRemove)

        return "user has been removed"
    }

}