import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ResetToken } from "./reset-token.entity";

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
    document: string; // Agregado

    @Column('text')
    country: string; // Agregado

    @Column('text')
    phoneNumber: string; // Agregado

    @Column('text', {
        nullable: true
    })
    phoneNumber2: string; // Agregado, opcional

    @Column('text')
    sponsor: string; // Agregado

    @Column('text', {
        default: 'registered'
    })
    state: string;

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
