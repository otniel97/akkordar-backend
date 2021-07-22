import { IsDate, IsNotEmpty, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('category')
@Unique(['name'])
export class Category {

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{ 
        nullable:false,
        name:"name"
    })
    @Length(5, 20)
    @IsNotEmpty()
    name:string;
        
    @Column("varchar",{ 
        nullable:false,
        name:"icon"
    })
    @IsNotEmpty()
    icon:string;
    
    @Column("int",{ 
        nullable:false,
        default: 1,
        name:"status"
    })
    status:number;

    @CreateDateColumn({ type: "timestamp"})
    createAt: Date;

    @CreateDateColumn({ type: "timestamp"})
    updateAt: Date;
}