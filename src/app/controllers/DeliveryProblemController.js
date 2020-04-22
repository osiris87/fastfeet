import Order from "../models/Order";
import DeliveryProblem from "../models/DeliveryProblem";
import { Op } from "sequelize";

class DeliveryProblemController {
  async store(req, res) {
    const { delivery_id } = req.params;

    const order = await Order.findOne({
      where: {
        id: delivery_id,
        end_date: null,
        canceled_at: null,
        start_date: {
          [Op.ne]: null,
        },
      },
    });

    if (!order) {
      return res.status(400).json({ error: "Encomenda não encontrada" });
    }

    const { description } = req.body;

    const problem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemController();
