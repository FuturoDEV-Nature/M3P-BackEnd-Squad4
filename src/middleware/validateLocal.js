const validarLocal = (schema) => async (req, res, next) => {
  if (!req.body.nomeLocal) {
    return res
      .status(400)
      .json({ error: "Digite o nome do local da natureza." });
  }

  if (!req.body.localizacao) {
    return res.status(400).json({ error: "Informe a localização. ex: Praia Mole - Florianópolis" });
  }
  if (!req.body.descricao) {
    return res.status(400).json({ error: "Informe uma descrição do local da natureza" });
  }

  try {
    await schema.validate(({ body } = req.body));

    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = validarLocal;
