class RecipientsController {
  async store(req, res) {
    return res.json(req.body);
  }
}

export default new RecipientsController();
