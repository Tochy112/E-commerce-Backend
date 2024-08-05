import { AppDataSource } from "../../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../../user/entities/User"

export class BookController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
         const users = await this.userRepository.find()
        
        return response.status(200).json({users})
    }

    

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        // const user = Object.assign(new User(), {
        //     firstName,
        //     lastName,
        //     age
        // })

        const user = this.userRepository.create({
            firstName,
            lastName,
            age
        })

        await this.userRepository.save(user)

        return response.status(201).json({data: user})
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}