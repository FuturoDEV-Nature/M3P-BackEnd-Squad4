const { compare } = require("bcrypt"); // Certifique-se de que bcrypt está instalado
const { sign } = require("jsonwebtoken");
const User = require("../models/User");

class LoginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ error: "O email é obrigatório" });
      }

      if (!password) {
        return res.status(400).json({ error: "A senha é obrigatória" });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({
          error: "Nenhum usuário corresponde ao email fornecido.",
        });
	}


      // Comparar a senha fornecida com a senha armazenada
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Email ou senha incorretos." });
      }

      const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '12h' });	// Token válido por 12 horas

      res.status(200).json({ Token: token });
    } catch (error) {
      console.error(error); // Adicionei um log para ver erros no console
      return res.status(500).json({ error: "Algo deu errado!" });
    }
  }
}

module.exports = new LoginController();
