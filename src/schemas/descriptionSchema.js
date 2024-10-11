const yup = require("yup");

// Atributos desejáveis da tabela Descrições
const actionSchema = yup.object().shape({
  userId: yup.number().integer(),
  local_id: yup.number().integer(),
  data_visita: yup.date().default(() => new Date()),
  descricao: yup.string().nullable()
});

module.exports = actionSchema;
