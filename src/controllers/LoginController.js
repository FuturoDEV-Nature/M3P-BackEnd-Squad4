const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("../models/User");

class LoginController {
  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (!email) {
        return res.status(400).json({ error: "O email é obrigatório" });
      }

      if (!password) {
        return res.status(400).json({ error: "O password é obrigatório" });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({
          error: "Nenhum usuário corresponde a email e password fornecido.",
        });
      }
      /*
      const hashSenha = await compare(password, user.password);

       if (hashSenha === false) {
         return res.status(400).json({ mensagem: "Conta não encontrada." });
      }
*/
      const payload = {
        sub: user.id,
        email: user.email,
        nome: user.nome,
      };

      const token = sign(payload, process.env.SECRET_JWT);

      res.status(200).json({ Token: token });
    } catch (error) {
      return res.status(500).json({ error: error, errorm: "Algo deu errado!" });
    }
  }
}

module.exports = new LoginController();
