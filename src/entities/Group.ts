import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Permission } from "./Permission"
import { User } from "./User"

@Entity('groups')
export class Group{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @ManyToMany(() => Permission, permission => permission.groups)
    @JoinTable({
        name: 'groups_permissions',
        joinColumn: ({
            name: 'permission_id',
            referencedColumnName: 'id'
        }),
        inverseJoinColumn: ({
            name: 'group_id',
            referencedColumnName: 'id'
        })
    })
    permissions: Permission[]

    @ManyToMany(() => User, user => user.groups)
    users: User[]
}