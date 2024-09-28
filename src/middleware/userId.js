const { verify } = require("jsonwebtoken");

// Middleware para verificar o token JWT
async function userId(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token não é válido" });
  }

  try {
    const decodedToken = verify(token, process.env.SECRET_JWT);
    req.userId = decodedToken.sub;
    //console.log(req.userId)
    next();
  } catch (error) {
    console.error("Erro ao verificar o token JWT:", error);
    return res.status(401).json({ error: "Acesso negado." });
  }
}

module.exports = { userId };
