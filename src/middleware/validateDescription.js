const validarDescription = (schema) => async (req, res, next) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ error: "Digite o nome do local da natureza." });
  }

  if (!req.body.localidade) {
    return res.status(400).json({ error: "Informe uma localização, o endereço e a cidade " });
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

  if (!validarData(req.body.data_visita)) {
    return res
      .status(400)
      .json({
        error: "Por favor, digite a data de visitação no formato YYYY-MM-DD",
      });
  }

  try {
    await schema.validate(({ body } = req.body));

    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = validarDescription;
