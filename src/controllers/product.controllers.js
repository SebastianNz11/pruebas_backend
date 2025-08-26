
import { prisma } from "../db/db.js";

export const getProducts = async (req, res) => {
  const { id } = req.user;
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ["Error al obtener los productos"] });
  }
};

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });
    if (!product) {
      return res.status(404).json({ message: ["Producto no encontrado"] });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ["Error al obtener el producto"] });
  }
};

export const createProduct = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        userId,
      },
    });
    res.status(201).json({
      message: "Producto creado correctamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ["Error al crear el producto"] });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;
  try {
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });
    if (!existingProduct) {
      return res.status(404).json({
        message: ["Producto no encontrado"],
      });
    }

    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
      },
    });
    res.status(200).json({
      message: "Producto actualizado correctamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ["Error al actualizar el producto"] });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });
    if (!existingProduct) {
      return res.status(404).json({ message: ["Producto no encontrado"] });
    }
    await prisma.product.deleteMany({
      where: {
        id: parseInt(id),
        userId,
      },
    });
    res.status(200).json({ message: ["Producto eliminado correctamente"] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ["Error al eliminar el producto"] });
  }
};
