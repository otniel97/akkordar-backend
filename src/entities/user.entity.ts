import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Commune } from "./commune.entity";
import { Gender } from "./gender.entity";

@Entity('user')
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column('varchar', {
        nullable: false,
        name: 'username'
    })
    username: string

    @Column('varchar', {
        nullable: false,
        name: 'email'
    })
    email: string

    @Column('varchar', {
        nullable: false,
        name: 'username'
    })

    @Column('varchar', {
        nullable: false,
        name: 'password'
    })
    password: string


    @CreateDateColumn({
        name: 'create_time',
        type: 'timestamp'
    })
    createTime: Date;

    @Column('varchar', {
        nullable: true,
        name: 'profile_image'
    })
    profileImage: string

    @Column('varchar', {
        nullable: true,
        name: 'cover_image'
    })
    coverImage: string

    @Column('tinyint', {
        nullable: true,
        name: 'validated',
        default: false
    })
    validated: Boolean

    @Column('int', {
        nullable: true,
        name: 'rating',
        default: 0
    })
    rating: number

    @ManyToOne(type => Commune, commune => commune.users)
    @JoinColumn({ name: 'commune_id', referencedColumnName: 'id' })
    commune: Commune;

    @ManyToOne(type => Gender, gender => gender.users)
    @JoinColumn({ name: 'gender_id', referencedColumnName: 'id' })
    gender: Gender;

}