const yup = require("yup");

// Atributos desejáveis da tabela AÇÕES
const actionSchema = yup.object().shape({
  userId: yup.number().integer(),
  local_id: yup.number().integer(),
  data_visita: yup.date().default(() => new Date()),
  desc_fauna: yup.string().nullable(),
  desc_flora: yup.string().nullable(),
});

module.exports = actionSchema;
