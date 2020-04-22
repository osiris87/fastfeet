import { startOfDay, endOfDay } from "date-fns";
import Order from "../models/Order";
import { Op } from "sequelize";

class OrderStartController {
  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: "Pedido não encontrado" });
    }
    const { canceled_at, deliveryman_id, start_date } = order;
    if (canceled_at) {
      return res.status(400).json({ error: "Encomenta ja foi cancelada" });
    }
    if (start_date) {
      return res.status(400).json({ error: "Encomenta ja saiu para entrega" });
    }

    const currentTime = new Date();
    const countOrdersDeliveryman = await Order.count({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(currentTime), endOfDay(currentTime)],
        },
      },
    });

    console.log(countOrdersDeliveryman);

    if (countOrdersDeliveryman > 4) {
      return res.status(400).json({
        error: "Entregado não pode ter mais do 5 entregas por dia",
      });
    }

    order.start_date = currentTime;

    await order.save();

    return res.json(order);
  }
}

export default new OrderStartController();
