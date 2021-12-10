const { body, param } = require("express-validator");
const { showErrors } = require("./show_errors.middlewares");
const {
  professionalExtractAtributes,
} = require("../middlewares/professionals.middlewares");
const professionalModels = require("../models/professional.models");

// Lista de middlewares para el post del profesional
const post_middlewares_professional = [
  professionalExtractAtributes,
  body(
    "datos_personales.nombre_completo",
    "El nombre no debe contener números o signos"
  ).isLength({ min: 5, max: 150 }),
  body("datos_personales.dni", "El formato del dni es incorrecto").isLength({
    min: 8,
  }),
  body("datos_personales.email", "No es una dirección válida.").isAscii(),
  body("datos_personales.telefono", "No es un móvil válido").isMobilePhone(),

  showErrors,
];

// Lista de middlewares para el update del profesional
const update_middlewares_professional = [
  professionalExtractAtributes,
  body(
    "datos_personales.nombre_completo",
    "El nombre no debe contener números o signos"
  )
    .isAlpha()
    .isLength({ min: 5, max: 150 }),
  body("datos_personales.dni", "El formato del dni es incorrecto").isLength({
    min: 8,
  }),
  body("datos_personales.email", "No es una dirección válida.").isAscii(),
  body("datos_personales.telefono", "No es un móvil válido").isMobilePhone(),

  //----------Validación de id en update------------------
  param("id", "Id inválida").isMongoId().trim().escape(),
  body("id", "El id enviado no es válido").custom(async (id) => {
    try {
      const profesionales = await professionalModels.findOne({ _id: id });
      if (profesionales) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }),

  showErrors,
];

module.exports = {
  post_middlewares_professional,
  update_middlewares_professional,
};
