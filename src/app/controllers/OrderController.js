import * as Yup from "yup";
import { subHours } from "date-fns";
import Recipient from "./../models/Recipients";
import Deliveryman from "./../models/Deliveryman";
import Order from "../models/Order";
import Op from "sequelize";

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

  async update(req, res) {
    const { id, status } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: "Pedido não encontrado" });
    }
    const now = subHours(new Date(), 3);

    const { start_date, end_date, canceled_at } = order;

    if (canceled_at) {
      return res.status(400).json({ error: "Encomenta ja foi cancelada" });
    }

    const countOrdersDeliveryman = await Order.count({
      where: { deliveryman_id, start_date: { [Op.and]: [new Date()] } },
    });

    console.log(countOrdersDeliveryman);

    if (start_date && status === "start") {
      return res.status(400).json({
        error: "Encomenta ja saiu para entrega",
      });
    }

    if (end_date && status === "end") {
      return res.status(400).json({
        error: "Encomenta ja foi entregue",
      });
    }

    // if (countOrdersDeliveryman > 1) {
    //   return res
    //     .status(400)
    //     .json({ error: "Entregador não ter mais do que 5 entregas no dia." });
    // }

    switch (status) {
      case "start":
        order.start_date = now;
        break;
      case "end":
        if (start_date) {
          order.end_date = now;
        } else {
          return res.status(400).json({
            error: "Encomenta não foi retirada do deposito",
          });
        }
        break;
      case "cancel":
        if (!end_date) {
          order.canceled_at = now;
        } else {
          return res.status(400).json({ error: "Encomenta já foi entregue" });
        }
        break;
      default:
        return res.status(404).json({ error: "Rota não encontrada" });
    }

    await order.save();

    return res.json(order);
  }
}

export default new OrderController();
