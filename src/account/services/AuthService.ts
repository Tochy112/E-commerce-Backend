import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { Request } from "express";
import { Account } from "../entities/Account";
import {
  InternalServerError,
  UnauthorizedError,
} from "../../utils/error-management/error";
import { FindOptionsSelect, Repository } from "typeorm";

@injectable()
export default class AuthService {
  constructor(
    @inject(Account.name) private accountRepository: Repository<Account>,
    ) {}


async verifyToken(token: string): Promise<JwtPayload> {
    try{
        return jwt.verify(token, process.env.JWT_SECRET!)as JwtPayload;
    }catch(e){
        if (e instanceof JsonWebTokenError) throw new UnauthorizedError();
      else
        throw new InternalServerError(
          `Encountered and error: ${(e as any).toString()}`
        );
    }
}


  async getCurrentAccount(
    request: Request,
    withPassword: boolean = false
  ): Promise<Account> {
    //Verify the header token
    const token = request.headers.authorization?.slice(7);
    if (!token) throw new UnauthorizedError();

    //Verfy the payload
    const payload = await this.verifyToken(token);
    if (!payload?.id) throw new UnauthorizedError();

    const select = [
      "username",
      "email",
      "firstName",
      "lastName",
      "lastLogin",
      "id",
    ];

    if (withPassword) select.push("password");

    //Get the current logged in account
    const currAccount = await this.accountRepository.findOneOrFail({
      where: {
        id: payload.id,
      },
      relations: ["role"],
      select: select as FindOptionsSelect<Account>,
    });

    //Return the account
    return currAccount;
  }
}
