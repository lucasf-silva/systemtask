import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Group } from "./Group"

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    code: string
    
    @ManyToMany(() => Group, groups => groups.permissions)
    groups: Group[]
}