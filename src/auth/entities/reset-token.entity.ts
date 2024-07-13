import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('reset_tokens')
export class ResetToken {
        
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    token: string;

    @ManyToOne(
        () => User, 
        user => user.resetToken
    )
    user: User;

    @CreateDateColumn({
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
}