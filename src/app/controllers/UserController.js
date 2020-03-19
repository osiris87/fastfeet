import User from "./../models/User";

class UserController {
  async store(req, res) {
    const checkUser = await User.findOne({ where: { email: req.body.email } });
    if (checkUser) {
      res.json({ msg: "Ok" });
    } else {
      res.status(401).json({ msg: "Usuario não encontrado" });
    }
  }
}

export default new UserController();
