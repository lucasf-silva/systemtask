import { Router } from "express";
import { GroupController } from "./controller/groupController";
import { PermissionController } from "./controller/permissionController";
import { UserController } from "./controller/userController";
import { authMiddleware } from "./middileware/authMiddleware";
import { TaskController } from "./controller/taskController";

const routes = Router();

//User Rotas
const userController = new UserController();

routes.post('/register', async (req, res) => {
    try {
        await userController.register(req, res)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

routes.get('/login', async (req, res) => {
    try {
        await userController.Login(req, res)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

//Permission Rotas
const permissionController = new PermissionController();

routes.post('/permission', authMiddleware, async (req, res) => {
    try {
        await permissionController.create(req, res)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

routes.get('/permission', authMiddleware, async (req, res) => {
    try {
        await permissionController.list(req, res)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

routes.get('/permission/:id', authMiddleware, async (req, res) => {
    try {
        await permissionController.show(req, res)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

routes.put('/permission/:id', authMiddleware, async (req, res) => {
    try {
        await permissionController.update(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar subject' });
    }
})

routes.delete('/permission/:id', authMiddleware, async (req, res) => {
    try {
        await permissionController.delete(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

//Group Controller
const groupController = new GroupController();

routes.post('/group', authMiddleware, async (req, res) => {
    try {
        await groupController.create(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

routes.get('/group', authMiddleware, async (req, res) => {
    try {
        await groupController.list(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

routes.get('/group/:id', authMiddleware, async (req, res) => {
    try {
        await groupController.show(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

routes.delete('/group/:id', authMiddleware, async (req, res) => {
    try {
        await groupController.delete(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

routes.put('/group/:id', authMiddleware, async (req, res) => {
    try {
        await groupController.update(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

//Task Controller
const taskController = new TaskController();

routes.post('/task', authMiddleware, async (req, res) => {
    try {
        await taskController.create(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

routes.patch('/task/actions/:id', authMiddleware, async (req, res) => {
    try {
        await taskController.action(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

routes.put('/task/:id', authMiddleware, async (req, res) => {
    try {
        await taskController.update(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar subject' });
    }
})

export default routes;