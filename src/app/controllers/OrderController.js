import * as Yup from "yup";
import Recipient from "./../models/Recipients";
import Deliveryman from "./../models/Deliveryman";
import Order from "../models/Order";

class OrderController {
  async store(req, res) {
    //const schema = Yup.object()

    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(401).json({ error: "Destinatario não encontrado" });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(401).json({ error: "Entregador não encontrado" });
    }

    const order = await Order.create(req.body);

    return res.json(order);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: "Pedido não encontrado" });
    }

    const { canceled_at } = order;
    if (canceled_at) {
      return res.status(400).json({ error: "Encomenta já foi cancelada" });
    }

    const currentTime = new Date();
    order.canceled_at = currentTime;

    await order.save();

    return res.json(order);
  }
}

export default new OrderController();
