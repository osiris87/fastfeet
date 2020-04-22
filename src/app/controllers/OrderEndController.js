import Order from "../models/Order";
import File from "../models/File";

class OrderEndController {
  async update(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });

    if (!file) {
      return res
        .status(400)
        .json({ error: "Não foi possivel salvar a sua assinatura" });
    }

    const currentTime = new Date();

    const order = await Order.update(
      {
        signature_id: file.id,
        end_date: currentTime,
      },
      { where: { id: req.orderId } }
    );

    return res.json(order);
  }
}

export default new OrderEndController();
