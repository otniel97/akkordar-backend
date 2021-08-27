import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Commune } from "./commune.entity";

export enum RegionStatus {
    ACTIVE = 1
}

@Entity('region')
@Unique(['name'])
export class Region {

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
        default: RegionStatus.ACTIVE
    })
    status: Boolean;

    @OneToMany((type) => Commune, commune => commune.region)
    communes: Commune[];

    @CreateDateColumn({ type: "timestamp" })
    createAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    updateAt: Date;
}