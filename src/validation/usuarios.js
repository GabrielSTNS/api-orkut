const joi = require("joi");

const usuarioSchema = joi.object({
  nome: joi.string().min(3).required().messages({
    "string.empty": "O nome é obrigatório.",
    "string.min": "O nome deve conter pelo menos 3 caracteres.",
    "any.require": "O nome é obrigatório.",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "O e-mail é obrigatório.",
    "string.email": "Por favor, insira um e-mail válido.",
    "any.require": "O e-mail é obrigatório.",
  }),
  senha: joi.string().min(6).required().messages({
    "string.base": "A senha deve ser uma string.",
    "string.empty": "A senha é obrigatória.",
    "string.min": "A senha deve conter pelo menos 6 caracteres.",
    "any.require": "A senha é obrigatória.",
  }),
});

function validarUsuarios(req, res, next) {
  const { error } = usuarioSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log(error);
    return res.status(400).json({
      erro: error.details.map((e) => e.message),
    });
  }

  next();
}

module.exports = validarUsuarios;
