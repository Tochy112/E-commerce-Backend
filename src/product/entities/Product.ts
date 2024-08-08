import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Ecategory } from "../types";
  
  @Entity()
  export class Product{
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", unique: true })
    name!: string;

    @Column({ type: "bigint", unique: true })
    price!: number;
    
    @Column({ type: "varchar", length: 400, unique: true })
    description!: string;

    @Column({ type: "varchar", unique: true, nullable: true })
    image!: string;

    @Column({ type: "enum", enum: Ecategory, unique: true })
    category!: Ecategory 
  
    @UpdateDateColumn({ nullable: true })
    updateDate?: Date;
  
    @CreateDateColumn()
    createDate!: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleteDate?: Date;
}
  