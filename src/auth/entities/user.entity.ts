import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ResetToken } from "./reset-token.entity";
import { State } from "src/states/entities/state.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    fullName: string;

    @Column('text')
    document: string; 

    @Column('text')
    country: string; 

    @Column('text')
    phoneNumber: string; 

    @Column('text', {
        nullable: true
    })
    phoneNumber2: string;

    @Column('text')
    sponsor: string; 

    // @Column('text', {
    //     default: 'Registrado'
    // })
    // state: string;

    @ManyToOne(
        () => State,
        state => state.id
    )
    state: number;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @ManyToOne(
        () => ResetToken, 
        resetToken => resetToken.user
    )
    resetToken: ResetToken;

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

    @BeforeInsert()
    @BeforeUpdate()
    transformFields() {
        this.email = this.email.toLowerCase().trim();
        this.fullName = this.capitalize(this.fullName);
    }

    private capitalize(str: string) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
}
