import { Request, Response } from 'express';
import { permissionRepository } from '../repository/permissionRepository';

export class PermissionController {
    async create(req: Request, res: Response): Promise<Response> {
        const { name, code } = req.body;

        try {
            const newPermission = permissionRepository.create({ name, code });
            await permissionRepository.save(newPermission);
            return res.status(201).json(newPermission);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const list = await permissionRepository.find();
            return res.status(200).json(list)
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: 'Unable to load data. Refresh a page or try again later' });
        }

        try {
            const permission = await permissionRepository.findOneOrFail({
                where: { id: Number(id) }
            });

            if(!permission){
                return res.status(401).json({ message: 'Permission not found' });
            }

            return res.status(200).json(permission)
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: 'Unable to load data. Refresh a page or try again later' });
        }


        try {
            await permissionRepository.delete(Number(id));

            return res.status(204).json({ message: 'Permission deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, code } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        try {
            await permissionRepository.update(Number(id), { name, code });

            const subject = await permissionRepository.findOneOrFail({
                where: { id: Number(id) }
            });

            return res.json(subject);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}