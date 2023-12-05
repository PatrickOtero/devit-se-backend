import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class AdminEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true
    })
    userName: string

    @Column()
    password: string

    constructor(admin: Partial<AdminEntity>) {
        Object.assign(this, admin)
    }
}
