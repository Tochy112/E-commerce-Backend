// import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
// import { inject, injectable } from "tsyringe";
// import { Request } from "express";
// import {
//   InvalidCredentialsError,
//   InvalidOtpError,
//   OtpNotVerifiedError,
// } from "../errors";
// import { Account } from "../entities/Account";
// import otpGenerator from "otp-generator";
// // import EmailService from "../../utils/emails/EmailService";
// import {
//   InternalServerError,
//   UnauthorizedError,
// } from "../../utils/error-management/error";
// import { FindOptionsSelect } from "typeorm";

// @injectable()
// export default class AuthService {
//   constructor(
//     @inject(EmailService.name) private emailService: EmailService,
//     @inject(Account.name) private AccountEntity: typeof Account,
//     @inject(AccountPasswordRecovery.name)
//     private RecoveryEntity: typeof AccountPasswordRecovery
//   ) {}

//   protected getSecretKey(): string {
//     if (process.env.AUTH_SECRET_KEY) return process.env.AUTH_SECRET_KEY;
//     else throw new InternalServerError("no authentication secret key found");
//   }

//   async generateToken(data: IIndexable): Promise<string> {
//     const key = this.getSecretKey();
//     return jwt.sign(data, key, {
//       algorithm: "HS256",
//       expiresIn: "7d",
//     });
//   }

//   async generateTokenHeader(data: IIndexable): Promise<IIndexable> {
//     const token = await this.generateToken(data);
//     return { Authorization: `Bearer ${token}` };
//   }

//   async verifyToken(token: string): Promise<JwtPayload> {
//     const key = this.getSecretKey();
//     try {
//       return jwt.verify(token.trim(), key, {
//         algorithms: ["HS256"],
//       }) as JwtPayload;
//     } catch (e) {
//       if (e instanceof JsonWebTokenError) throw new UnauthorizedError();
//       else
//         throw new InternalServerError(
//           `Encountered and error: ${(e as any).toString()}`
//         );
//     }
//   }

//   async getCurrentAccount(
//     request: Request,
//     withPassword: boolean = false
//   ): Promise<Account> {
//     //Verify the header token
//     const token = request.headers.authorization?.slice(7);
//     if (!token) throw new UnauthorizedError();

//     //Verfy the payload
//     const payload = await this.verifyToken(token);
//     if (!payload?.id) throw new UnauthorizedError();

//     const select = [
//       "username",
//       "email",
//       "firstName",
//       "lastName",
//       "lastLogin",
//       "id",
//     ];

//     if (withPassword) select.push("password");

//     //Get the current logged in account
//     const currAccount = await this.AccountEntity.findOneOrFail({
//       where: {
//         id: payload.id,
//       },
//       relations: ["role", "role.permissions", "permissions"],
//       select: select as FindOptionsSelect<Account>,
//     });

//     //Return the account
//     return currAccount;
//   }

//   //Send and save OTP for password reset
//   async sendOtp(email: string): Promise<string> {
//     //Find Account using email
//     const newOtp = await this.sendEmail(email);

//     //Find OTP using email
//     const findOtp = await this.RecoveryEntity.findOne({
//       where: {
//         email: email,
//       },
//     });

//     if (findOtp) {
//       //Update existing OTP
//       findOtp.otpToken = newOtp;
//       await findOtp.save();

//       //return value
//       return email;
//     }

//     //Save new OTP
//     await this.RecoveryEntity.create({
//       otpToken: newOtp,
//       email: email,
//       createDate: new Date(),
//     }).save();

//     //return value
//     return email;
//   }

//   //Verify the OTP sent the Account's email
//   async verifyOtp(
//     otp: string,
//     email: string
//   ): Promise<AccountPasswordRecovery> {
//     //Find Account and OTP
//     const findOtp = await this.RecoveryEntity.findOne({
//       where: {
//         email: email,
//         otpToken: otp,
//       },
//     });

//     if (!findOtp) throw new InvalidOtpError();

//     //update otp verify status
//     findOtp.otpVerified = true;
//     findOtp.updateDate = new Date();
//     await findOtp.save();

//     return findOtp;
//   }

//   //Save Account's new password
// //   async resetPassword(email: string, newPassword: string): Promise<string> {
// //     //Find Account using email
// //     const account = await this.AccountEntity.findOne({
// //       where: {
// //         email: email,
// //       },
// //     });

// //     //Save new password
// //     if (account) {
// //       account.setPassword(newPassword);
// //       await account.save();
// //     } else {
// //       throw new InvalidCredentialsError();
// //     }

// //     //Find OTP using email
// //     const findOtp = await this.RecoveryEntity.findOne({
// //       where: {
// //         email: email,
// //       },
// //     });

// //     //Delete OTP
// //     if (findOtp) await findOtp.remove();

// //     //Send confirmation email
// //     const context = { name: account.firstName };
// //     await this.emailService.sendMail(
// //       "Account Recovery",
// //       "Hi {{name}}, You have successfully changed your password.",
// //       context,
// //       email
// //     );

// //     //Return value
// //     return email;
// //   }

//   //Generate password reset token
// //   async generateOtp(): Promise<string> {
// //     //Generate OTP
// //     const otp = otpGenerator.generate(6, {
// //       digits: true,
// //       lowerCaseAlphabets: false,
// //       upperCaseAlphabets: false,
// //       specialChars: false,
// //     });

// //     return otp;
// //   }

//   //Send OTP email
// //   async sendEmail(email: string): Promise<string> {
// //     //Find Account using email
// //     const account = await this.AccountEntity.findOneOrFail({
// //       where: {
// //         email: email,
// //       },
// //     });

// //     //Get OTP token
// //     const newOtp =
// //       process.env.NODE_ENV == "testing.integration"
// //         ? "123456"
// //         : await this.generateOtp();

// //     //Send OTP by formatted email
// //     const context = {
// //       otp: newOtp,
// //       name: account.firstName,
// //     };
// //     const template =
// //       "Hi {{name}}, You have requested to change your password with OTP: {{otp}}.";

// //     //Call email sending service
// //     const mail = await this.emailService.sendMail(
// //       "Account Recovery",
// //       template,
// //       context,
// //       email
// //     );

// //     return newOtp;
// //   }

// //   async confirmOtpVerification(otp: string, email: string): Promise<boolean> {
// //     //Find Account and OTP
// //     const otpVerification = await this.RecoveryEntity.findOne({
// //       where: {
// //         email: email,
// //         otpToken: otp,
// //       },
// //     });

// //     if (!otpVerification) throw new InvalidOtpError();

// //     if (!otpVerification.otpVerified) {
// //       throw new OtpNotVerifiedError();
// //     }

// //     return true;
// //   }

// //   async clearOtpVerification(email: string): Promise<boolean> {
// //     const accountPasswordReset = await this.RecoveryEntity.findOne({
// //       where: {
// //         email: email,
// //       },
// //     });

// //     if (!accountPasswordReset) {
// //       return false;
// //     }

// //     accountPasswordReset.remove();
// //     return true;
// //   }
// }
