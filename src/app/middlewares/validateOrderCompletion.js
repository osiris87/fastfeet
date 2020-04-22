import Order from "./../models/Order";

export default async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByPk(id);
  if (!order) {
    return res.status(400).json({ error: "Pedido não encontrado" });
  }

  const { canceled_at, start_date } = order;
  if (canceled_at) {
    return res.status(400).json({ error: "Encomenda ja foi cancelada" });
  }

  if (!start_date) {
    return res
      .status(400)
      .json({ error: "Encomenta ainda não saiu para entrega" });
  }

  req.orderId = order.id;

  return next();
};
