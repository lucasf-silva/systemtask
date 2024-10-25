import { Request, Response } from 'express';
import { groupRepository } from '../repository/groupRepository';
import { permissionRepository } from '../repository/permissionRepository';
import { In } from 'typeorm';
import { Group } from '../entities/Group';


export class GroupController {
    async create(req: Request, res: Response): Promise<Response> {
        const { name, permissions } = req.body;

        try {
            const foundPermissions = await permissionRepository.find({
                where: {
                    id: In(permissions),
                }
            })

            const group = new Group();
            group.name = name;
            group.permissions = foundPermissions; 
            
            await groupRepository.save(group);

            return res.status(201).json(group);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const list = await groupRepository.find({ relations: ['permissions'] });
            return res.status(200).json(list)
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Unable to load data. Refresh a page or try again later' });
        }

        try {
            const group = await groupRepository.findOneOrFail({
                where: { id: Number(id) },
                relations: ['permissions'] 
            });

            if (!group) {
                return res.status(401).json({ message: 'Group not found' });
            }

            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Unable to load data. Refresh a page or try again later' });
        }


        try {
            await groupRepository.delete(Number(id));

            return res.status(204).json({ message: 'Group deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, permissions } = req.body;

        try {
            const group = await groupRepository.findOne({
                where: {
                    id: Number(id)
                }
            });

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            const foundPermissions = await permissionRepository.find({
                where: {
                    id: In(permissions),
                }
            }) 

            group.name = name;
            group.permissions = foundPermissions;
            
            await groupRepository.save(group);

            return res.status(201).json(group);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}