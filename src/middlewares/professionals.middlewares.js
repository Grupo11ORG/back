const middlewares = {};

middlewares.professionalExtractAtributes = (req, res, next) => {
  let { datos_personales, info_profesional, info_lugar_trabajo } = req.body;

  const {
    nombre_completo,
    fecha_nacimiento,
    dni,
    sexo,
    telefono,
    email,
    es_profesional,
  } = datos_personales;

  const { certificaciones, img_certif, rubros } = info_profesional;

  const { dias_atencion, horario_atencion, direccion, marcador } =
    info_lugar_trabajo;

  const extracted_datos_personales = {
    nombre_completo,
    fecha_nacimiento,
    dni,
    sexo,
    telefono,
    email,
    es_profesional,
  };

  const extracted_info_profesional = {
    certificaciones,
    img_certif,
    rubros,
  };

  const extracted_info_lugar_trabajo = {
    dias_atencion,
    horario_atencion,
    direccion,
    marcador,
  };

  datos_personales = extracted_datos_personales;
  info_profesional = extracted_info_profesional;
  info_lugar_trabajo = extracted_info_lugar_trabajo;

  next();
};

module.exports = middlewares;
