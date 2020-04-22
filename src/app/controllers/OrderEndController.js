import Order from "../models/Order";

class OrderEndController {
  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: "Pedido não encontrado" });
    }

    const currentTime = new Date();

    const { canceled_at, start_date } = order;
    if (canceled_at) {
      return res.status(400).json({ error: "Encomenta ja foi cancelada" });
    }

    if (!start_date) {
      return res
        .status(400)
        .json({ error: "Encomenta ainda não saiu para entrega" });
    }

    order.end_date = currentTime;

    await order.save();

    return res.json(order);
  }
}

export default new OrderEndController();
