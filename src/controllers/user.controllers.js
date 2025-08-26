import { prisma } from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: ["El usuario ya existe"] });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    res.status(201).json({
      message: ["Usuario creado correctamente"],
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ["Error al crear el usuario"] });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res
        .status(401)
        .json({ message: ["Correo o contraseña incorrectos"] });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) {
      return res
        .status(401)
        .json({ message: ["Correo o contraseña incorrectos"] });
    }
    const token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.JWT_CLAVE,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ["Error el al hacer login"] });
  }
};
