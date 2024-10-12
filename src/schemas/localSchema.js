const yup = require("yup");

// Atributos necessários da tabela LOCAIS DE PERSERVAÇÃO
const localSchema = yup.object().shape({
  name: yup.string().required(),
  localidade: yup.string().required(),	//CEP, complemento... não sei se é a melhor forma.
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
