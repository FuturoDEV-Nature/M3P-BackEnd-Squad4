const { verify } = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    console.log("Entramos no Middleware auth.js");

    // Pegando o token diretamente do cabeçalho 'authorization'
    const token = req.headers.authorization;

    // Verifica se o token existe
    if (!token) {
      return res.status(401).json({
        error: "Autenticação Falhou!",
        cause: "Token não encontrado",
      });
    }

    // Verificar o token usando jwt.verify
    req.payload = verify(token, process.env.SECRET_JWT);

    // Se tudo estiver correto, continuar para o próximo middleware
    next();
  } catch (error) {
    // Tratamento de erros específicos do JWT
    let message = "Token inválido ou expirado";
    
    if (error.name === "TokenExpiredError") {
      message = "Token expirado";
    } else if (error.name === "JsonWebTokenError") {
      message = "Token inválido";
    }

    return res.status(401).json({
      error: "Autenticação Falhou!",
      cause: message,
    });
  }
}

module.exports = { auth };
