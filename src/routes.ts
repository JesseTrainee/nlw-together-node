import { Router } from 'express';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
router.post("/users", ensureAdmin, createUserController.handle);
router.post("/tags", createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments",createComplimentController.handle);

export { router };