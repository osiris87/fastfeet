import User from "./../models/User";
import File from "./../models/File";
import Deliveryman from "./../models/Deliveryman";

import * as Yup from "yup";

class DeliverymanController {
  async index(req, res) {
    const admin = await User.findByPk(req.adminId);

    if (!admin) {
      return res.status(401).json({
        error: "Você não tem autorização para realizar esse pedido!",
      });
    }

    const deliverymen = await Deliveryman.findAll({
      attributes: ["id", "name", "email"],
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["name", "path", "url"],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ msg: "Não passou pela validação!" });
    }

    const admin = await User.findByPk(req.adminId);

    if (!admin) {
      return res.status(401).json({
        error: "Você não tem autorização para realizar esse cadastro!",
      });
    }

    const checkEmail = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (checkEmail) {
      return res.status(400).json({ error: "Usuario já existente!" });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ msg: "Não passou pela validação!" });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { id: req.params.deliveryman_id },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: "Entregador não encontrado!" });
    }

    const { email, avatar_id } = req.body;

    if (email && email !== deliveryman.email) {
      const emailExists = await Deliveryman.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: "Email já Cadastrado!" });
      }
    }

    if (avatar_id && avatar_id !== deliveryman.avatar_id) {
      const fileExists = await File.findByPk(avatar_id);
      if (!fileExists) {
        return res.status(400).json({ error: "Arquivo não encontrado" });
      }
    }

    const { id, name } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: "Entregador não encontrado" });
    }
    await deliveryman.destroy();

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
