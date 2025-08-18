import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: ["Acceso no autorizado"] });

  jwt.verify(token, process.env.JWT_CLAVE, (err, user) => {
    if (err) return res.status(403).json({ message: ["Token inválido"] });
    req.user = user;
    next();
  });
};
