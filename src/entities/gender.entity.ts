import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";


export enum GenderStatus {
    ACTIVE = 1
}

@Entity('gender')
@Unique(['name'])
export class Gender {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {
        nullable: false,
        name: "name"
    })
    name: string;

    @Column("tinyint", {
        nullable: false,
        name: "status",
        default: GenderStatus.ACTIVE
    })
    status: Boolean;

    @OneToMany((type) => User, user => user.gender)
    users: User[];

    @CreateDateColumn({ type: "timestamp" })
    createAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    updateAt: Date;
}