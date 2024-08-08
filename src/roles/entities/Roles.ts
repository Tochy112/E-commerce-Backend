import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Role{
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", unique: true })
    name!: string;
  
    @Column({ type: "text", nullable: true })
    description?: string;
  
    @UpdateDateColumn({ nullable: true })
    updateDate?: Date;
  
    @CreateDateColumn()
    createDate!: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleteDate?: Date;
}
  