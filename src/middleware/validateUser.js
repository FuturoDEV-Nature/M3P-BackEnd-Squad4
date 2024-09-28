const User = require("../models/User");

const validarUser = (schema) => async (req, res, next) => {
  if (!req.body.nome || !req.body.email) {
    return res.status(400).json({ error: "O nome e email são obrigatórios" });
  }

  function validarData(data) {
    // Expressão regular para verificar se a data está no formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (regex.test(data)) {
      const [ano, mes, dia] = data.split("-");
      const anoInt = parseInt(ano, 10);
      const mesInt = parseInt(mes, 10);
      const diaInt = parseInt(dia, 10);

      if (
        anoInt >= 1000 &&
        anoInt <= 9999 &&
        mesInt >= 1 &&
        mesInt <= 12 &&
        diaInt >= 1 &&
        diaInt <= 31
      ) {
        return true; // A data é válida
      }
    }
    return false;
  }

  if (!validarData(req.body.data_nascimento)) {
    return res
      .status(400)
      .json({
        error: "Por favor, digite a data de nascimento no formato YYYY-MM-DD",
      });
  }

  if (!req.body.password) {
    return res.status(400).json({ error: "Insira uma password." });
  }

  if (!req.body.cpf || req.body.cpf.length !== 11) {
    return res
      .status(400)
      .json({ error: "O CPF precisa ser um número com 11 dígitos (string)." });
  }

  if (!req.body.sexo) {
    return res
      .status(400)
      .json({
        error:
          "No item sexo escolha entra as opções: feminino, masculino ou outros.",
      });
  }

  try {
    // Verificar se o CPF já existe na tabela Users
    const user = await User.findOne({ where: { cpf: req.body.cpf } });

    if (user) {
      return res.status(409).json({ error: "CPF já cadastrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar CPF na tabela Users:", error);
    return res
      .status(500)
      .json({ error: "Não foi possível cadastrar seu CPF." });
  }

  // Validar email do usuário
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (!validarEmail(req.body.email)) {
    return res.status(400).json({ error: "Insira um email válido" });
  }

  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Não foi possível cadastrar seu email." });
  }

  try {
    await schema.validate(({ body } = req.body));

    return next();
  } catch (error) {
    //console.error(error, error)
    return res.status(400).json({ error });
  }
};

module.exports = validarUser;
