import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";
import DeliverymanController from "./app/controllers/DeliverymanController";
import OrderController from "./app/controllers/OrderController";
import FileController from "./app/controllers/FileController";

import authMiddleware from "./app/middlewares/auth";

import multer from "multer";
import multerConfig from "./config/multer";
import SignatureController from "./app/controllers/SignatureController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/auth", SessionController.store);

routes.use(authMiddleware);

routes.post("/files", upload.single("file"), FileController.store);
routes.post("/signature", upload.single("file"), SignatureController.store);

routes.post("/recipients", RecipientsController.store);
routes.put("/recipients/:recipient_id", RecipientsController.update);

routes.get("/deliveryman", DeliverymanController.index);
routes.post("/deliveryman", DeliverymanController.store);
routes.put("/deliveryman/:deliveryman_id", DeliverymanController.update);
routes.delete("/deliveryman/:deliveryman_id", DeliverymanController.delete);

routes.post("/orders", OrderController.store);

export default routes;
