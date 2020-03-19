import User from "./../models/User";
import Recipient from "./../models/Recipients";

class RecipientsController {
  async store(req, res) {
    const checkUser = await User.findOne({ where: { id: req.userId } });
    console.log(checkUser);
    return res.json(req.userId);
  }
}

export default new RecipientsController();
