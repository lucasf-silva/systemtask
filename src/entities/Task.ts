import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { User } from './User'; // Supondo que você tenha a entidade User já criada.

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    status: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true, default: null })
    concluded: Date | null;

    @Column({ type: 'timestamp' })
    dueDate: Date;

    @Column({ type: 'int' })
    createdById: number;

    @Column({ type: 'int', nullable: true })
    responsibleId: number | null;

    @Column({ type: 'timestamp', nullable: true, default: null })
    iniciadaEm: Date | null;
}