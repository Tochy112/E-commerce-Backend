import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Account } from "../../account/entities/Account";
import { Product } from "../../product/entities/Product";
  
  @Entity()
  export class Review{
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", unique: true })
    rating!: string;
  
    @Column({ type: "text", nullable: true })
    title!: string;

    @Column({ type: "text", nullable: true })
    comment!: string;

    @OneToOne(() => Account)
    @JoinColumn()
    account!: Account;

    @ManyToOne(() => Product)
    @JoinColumn()
    product!: Product;
  
    @UpdateDateColumn({ nullable: true })
    updateDate?: Date;
  
    @CreateDateColumn()
    createDate!: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleteDate?: Date;
}
  