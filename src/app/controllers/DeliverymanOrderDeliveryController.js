import Order from "../models/Order";
import { Op } from "sequelize";

class DeliverymanOrderDeliveryController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: {
          [Op.ne]: null,
        },
        canceled_at: null,
      },
    });

    if (!orders) {
      return res
        .status(400)
        .json({ error: "Não exitem pedidos entregues por esse entregador" });
    }

    return res.json(orders);
  }
}

export default new DeliverymanOrderDeliveryController();
