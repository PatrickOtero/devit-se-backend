import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class MentorEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    mentorName: string

    @Column({
        unique: true
    })
    userName: string

    @Column()
    password: string

    constructor(mentor: Partial<MentorEntity>) {
        Object.assign(this, mentor)
    }
}
