import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TeacherController from './app/controllers/TeacherController';
import TurmaController from './app/controllers/TurmaController';
import StudentController from './app/controllers/StudentController';
import ContaTurmaController from './app/controllers/ContaTurmaController';
import AtividadeController from './app/controllers/AtividadeController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/teachers', TeacherController.index);

routes.get('/students/:id', StudentController.getById);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/turmas', TurmaController.store);
routes.get('/turmas/:id', TurmaController.getById);
routes.put('/turmas', TurmaController.update);
routes.get('/turmas', TurmaController.index);
routes.delete('/turmas/:id', TurmaController.delete);

routes.get('/contaturma/:id', ContaTurmaController.getById);
routes.post('/contaturma', ContaTurmaController.store);

routes.get('/atividades/:id', AtividadeController.getById);
routes.post('/atividades', AtividadeController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
