import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    id!: number

    // @Column()
    // author!: string

    // @Column()
    // Date!: Date
}
