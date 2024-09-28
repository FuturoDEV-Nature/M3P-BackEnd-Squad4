const yup = require("yup");

const userSchema = yup.object().shape({
  name: yup.string().required(),
  cpf: yup.string().length(11).required(),
  email: yup.string().email().required(),
  sexo: yup.string().nullable(),
  password: yup.string().required(),
  data_nascimento: yup.date().notRequired(),
});

module.exports = userSchema;
