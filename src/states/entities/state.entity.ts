import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('states')
export class State {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column('text', {
        unique: true
    })
    name: string;

    @OneToMany(
        () => User, 
        user => user.state
    )
    user: User[];

    @CreateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP', 
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp',
        nullable: true,
        default: null
    })
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    transformFields() {
        this.name = this.capitalize(this.name);
    }

    private capitalize(str: string) {
        return str.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
}
