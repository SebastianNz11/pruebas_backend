import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "El nombre solo puede contener letras y espacios",
    }),
  email: z.string().email({ message: "El correo no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});






export const loginSchema = z.object({
  email: z
    .string({ required_error: "El correo es obligatorio" }) 
    .min(1, { message: "El correo es obligatorio" })         
    .email({ message: "El correo no es válido" }),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
});