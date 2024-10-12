const validarLocal = (schema) => async (req, res, next) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ error: "Digite o nome do local da natureza." });
  }

  if (!req.body.localidade) {
    return res.status(400).json({ error: "Informe a localização. ex: Praia Mole - Florianópolis" });
  }

  try {
    await schema.validate(({ body } = req.body));

    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = validarLocal;
