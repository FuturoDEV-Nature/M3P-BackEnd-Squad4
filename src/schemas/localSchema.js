const yup = require("yup");

// Atributos necessários da tabela LOCAIS DE PERSERVAÇÃO
const localSchema = yup.object().shape({
  nomeLocal: yup.string().required(),
  localizacao: yup.string().required(),
  descricao: yup.string().required(),
  cep: yup.string().required(),
  userId: yup.number().integer(),
  lat: yup.string(),		
  lon: yup.string()
});

/*
 localidade: yup.object().shape({
	CEP: yup.string(),
	complemento: yup.string()
 })
 */

module.exports = localSchema;
