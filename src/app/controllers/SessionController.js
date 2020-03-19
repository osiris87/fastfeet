import jwt from "jsonwebtoken";

import User from "./../models/User";
import authConfig from "./../../config/auth";

import * as Yup from "yup";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(401)
        .json({ msg: "Email e senha devem ser preenchidos" });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ msg: "Email não encontrado" });
    }

    const checkPassword = await user.checkPassword(
      password,
      user.password_hash
    );

    if (!checkPassword) {
      return res.status(401).json({ msg: "Senha inválida" });
    }

    const { id, name } = user;
    const { secret, expiresIn } = authConfig;

    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, secret, { expiresIn })
    });
  }
}

export default new SessionController();
