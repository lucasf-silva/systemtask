import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text' })
    firstName: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: 'text' })
    phone: string;

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp' })
    lastLogin: Date;

    @Column({ type: 'boolean', default: false })
    inactive: boolean;

    @ManyToMany(() => Group, group => group.users)
    @JoinTable({
        name: 'users_groups',
        joinColumn: ({
            name: 'user_id',
            referencedColumnName: 'id'
        }),
        inverseJoinColumn: ({
            name: 'group_id',
            referencedColumnName: 'id'
        })
    })
    groups: Group[];
}