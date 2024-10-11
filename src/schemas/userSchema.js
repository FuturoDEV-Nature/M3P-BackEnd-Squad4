const yup = require("yup");

//Atributos necessários na tabela de USUÁRIOS
const userSchema = yup.object().shape({
  name: yup.string().required(),
  cpf: yup.string().length(11).required(),
  email: yup.string().email().required(),
  sexo: yup.string().nullable(),
  senha: yup.string().required(),
  data_nascimento: yup.date().required(),
  endereco: yup.string().required()		// CEP (?) 
});

module.exports = userSchema;
