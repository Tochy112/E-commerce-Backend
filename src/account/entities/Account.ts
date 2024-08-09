import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
  } from "typeorm";
  
  import bcrypt from "bcryptjs";
  import { BadRequestError } from "../../utils/error-management/error";
  import { Role } from "../../roles/entities/Roles";
  import jwt from "jsonwebtoken"
  import dotenv from "dotenv"
  dotenv.config()
  
  @Entity()
  export class Account{
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", length: 400 })
    firstName!: string;
  
    @Column({ type: "varchar", length: 400 })
    lastName!: string;
  
    @Column({ type: "varchar", length: 400, unique: true })
    username!: string;
  
    @Column({ type: "varchar", length: 400, unique: true })
    email!: string;
  
    @Column({ type: "text" })
    password!: string;
  
    @ManyToOne(() => Role)
    @JoinColumn()
    role!: Role;

    @Column({ type: "text", nullable: true })
    verificationToken!: string

    @Column({ type: "boolean", default: false })
    isVerified!: boolean

    @Column({ type: "text", nullable: true })
    passwordToken!: string
          
    @Column({ type: "datetime", nullable: true })
    passwordTokenExpirationDate?: Date
  
    @CreateDateColumn()
    createDate!: Date;
  
    @UpdateDateColumn({ nullable: true })
    updateDate?: Date;
  
    @Column({ type: "datetime", nullable: true })
    lastLogin?: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleteDate?: Date;
  
    setPassword(password: string) {
      this.password = bcrypt.hashSync(password, 10);
    }
  
    checkPassword(password: string) {
      if (!bcrypt.compareSync(password, this.password))
        throw new BadRequestError("Invalid credentails");
    }

    generateToken():string {
      return jwt.sign(
        { userId: this.id, username: this.username, role: this.role},
        process.env.JWT_SECRET!,
        {
          expiresIn: process.env.JWT_LIFETIME!,
        }
      )
    }
  }
  