import jwt from "jsonwebtoken";
import authConfig from "./../../config/auth";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token invalido" });
  }

  const [, token] = authHeader.split(" ");

  jwt.verify(token, authConfig.secret, (error, decode) => {
    if (error) {
      return res.status("401").json({ error: "Token invalid" });
    }
    req.adminId = decode.id;
    return next();
  });
};
