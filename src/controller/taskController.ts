import { Request, Response } from 'express';
import { taskRepository } from '../repository/taskRepository';
import { Task } from '../entities/Task';


export class TaskController {
    async create(req: Request, res: Response): Promise<Response> {
        const { userId, task }: { userId: number; task: any } = req.body;

        try {
            const newTask = new Task();
            newTask.title = task.title;
            newTask.description = task.description;
            newTask.status = 0;
            newTask.dueDate = new Date(task.dueDate);
            newTask.createdById = userId;
            newTask.responsibleId = task.responsible || null;

            await taskRepository.save(newTask);

            return res.status(201).json(newTask);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    }

    async action(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { action } = req.query;

        if (!id || !action) {
            return res.status(400).json({ message: 'Error to do the action' });
        }

        try {
            const task = await taskRepository.findOneOrFail({
                where: { id: Number(id) }
            });

            if (!task) {
                return res.status(401).json({ message: 'Task not found' });
            }

            if (task.status === 4 || task.status === 3) {
                return res.status(400).json({ message: 'Tasks that have already been completed or canceled cannot be changed' });
            }

            if (action === '1') {
                switch (task.status) {
                    case 0:
                        task.iniciadaEm = new Date();
                        task.status = 1;
                        break;
                    case 1:
                        return res.status(400).json({ message: 'Tasks have already started' });
                    case 2:
                        task.status = 1;
                        break;
                    default:
                        return res.status(400).json({ message: 'Internal server error' });
                }
            }

            if (action === '2') {
                switch (task.status) {
                    case 0:
                        return res.status(400).json({ message: 'Tasks not yet started cannot be paused' });
                    case 1:
                        task.status = 2;
                        break;
                    case 2:
                        return res.status(400).json({ message: 'Tasks have already been paused' });
                    default:
                        return res.status(400).json({ message: 'Internal server error' });
                }
            }

            if (action === '3') {
                switch (task.status) {
                    case 0:
                        return res.status(400).json({ message: 'Tasks not started, or paused cannot be completed' });
                    case 1:
                        task.concluded = new Date();
                        task.status = 3;
                        break;
                    case 2:
                        return res.status(400).json({ message: 'Tasks not started, or paused cannot be completed' });
                    default:
                        return res.status(400).json({ message: 'Internal server error' });
                }
            }

            if (action === '4') {
                task.status = 4;
                await taskRepository.save(task);

                return res.status(200).json({ message: 'Task canceled successfully' });
            }

            await taskRepository.save(task);

            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { content }: { content: any } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Unable to load data. Refresh a page or try again later' });
        }

        try {

            const task = await taskRepository.findOneOrFail({
                where: {
                    id: Number(id)
                }
            });

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            task.title = content.title || task.title;
            task.description = content.description || task.description;
            task.responsibleId = content.responsible | 0;

            await taskRepository.save(task);

            return res.status(201).json(task);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}