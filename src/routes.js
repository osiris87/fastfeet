import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";
import DeliverymanController from "./app/controllers/DeliverymanController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/auth", SessionController.store);

routes.use(authMiddleware);

routes.post("/recipients", RecipientsController.store);
routes.put("/recipients", RecipientsController.update);

routes.post("/deliveryman", DeliverymanController.store);

export default routes;
