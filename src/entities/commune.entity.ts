import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Region } from "./region.entity";
import { User } from "./user.entity";

export enum CommuneStatus {
    ACTIVE = 1
}

@Entity('commune')
@Unique(['name'])
export class Commune {

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
        default: CommuneStatus.ACTIVE
    })
    status: Boolean;

    @OneToMany((type) => User, user => user.commune)
    users: User[];

    @ManyToOne(type => Region, region => region.communes)
    @JoinColumn({ name: 'region_id', referencedColumnName: 'id' })
    region: Region;

    @CreateDateColumn({ type: "timestamp" })
    createAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    updateAt: Date;
}