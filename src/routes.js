import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";
import DeliverymanController from "./app/controllers/DeliverymanController";
import DeliverymanOrderController from "./app/controllers/DeliverymanOrderController";
import DeliverymanOrderDeliveryController from "./app/controllers/DeliverymanOrderDeliveryController";
import OrderController from "./app/controllers/OrderController";
import OrderStartController from "./app/controllers/OrderStartController";
import OrderEndController from "./app/controllers/OrderEndController";
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
routes.get("/deliveryman/:id/deliveries", DeliverymanOrderController.index);
routes.get(
  "/deliveryman/:id/delivered",
  DeliverymanOrderDeliveryController.index
);
routes.put("/deliveryman/:id", DeliverymanController.update);
routes.delete("/deliveryman/:id", DeliverymanController.delete);

routes.post("/orders", OrderController.store);
routes.put("/orders/:id/cancel", OrderController.delete);
routes.put("/orders/:id/start", OrderStartController.update);
routes.put("/orders/:id/end", OrderEndController.update);

export default routes;
