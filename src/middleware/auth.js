const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    console.log("Entramos no Middleware auth.js");

    const { token } = req.headers;
	// console.log("::: AUTH :::")
	// console.log (authorization)
	
    // Verifica se o cabeçalho Authorization existe e começa com "Bearer"
    if (!token) {
      return res.status(401).json({
        error: "Autenticação Falhou!",
        cause: "Token não encontrado ou mal formatado",
      });
    }

    // Verificar o token usando jwt.verify
    req["payload"] = verify(token, process.env.SECRET_JWT);

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Autenticação Falhou!",
      cause: error.message, // Corrigido para capturar a mensagem de erro correta
    });
  }
}

module.exports = { auth };
