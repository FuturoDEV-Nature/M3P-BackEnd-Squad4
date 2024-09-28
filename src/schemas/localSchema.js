const yup = require("yup");

const localSchema = yup.object().shape({
  name: yup.string().required(),
  local_endereco: yup.string().required(),
  userId: yup.number().integer(),
});

module.exports = localSchema;
