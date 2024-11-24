import { body } from "express-validator";

export const categoryValidator = [
  // body("email", "No puede estar vacio el email").not().isEmpty(),
  // body("email", "Email invalido").isEmail(),
  body("name", "Nombre es requerido").not().isEmpty(),
  body("name", "Nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
  body("description", "Descripción es requerida").not().isEmpty(),
  body("description", "Descripción debe tener al menos 3 caracteres").isLength({ min: 3 }),
];