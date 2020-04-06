import User from "./../models/User";
import Deliveryman from "./../models/Deliveryman";

import * as Yup from "yup";

class DeliverymanController {
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
}

export default new DeliverymanController();
