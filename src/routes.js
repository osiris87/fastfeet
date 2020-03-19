import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/auth", SessionController.store);
routes.post("/recipients", RecipientsController.store);

export default routes;
