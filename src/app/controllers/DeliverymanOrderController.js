import Order from "../models/Order";

class DeliverymanOrderController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: null,
        canceled_at: null,
      },
    });

    if (!orders) {
      return res
        .status(400)
        .json({ error: "Não esitem pedidos para esse entregador" });
    }

    return res.json(orders);
  }
}

export default new DeliverymanOrderController();
