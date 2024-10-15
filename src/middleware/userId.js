const { verify } = require("jsonwebtoken");

// Middleware para verificar o token JWT
async function userId(req, res, next) {
  try {
    const { authorization } = req.headers;

    // Verifica se o cabeçalho Authorization existe e começa com "Bearer"
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não é válido ou mal formatado" });
    }

    // Extrai o token removendo o "Bearer "
    const token = authorization.split(" ")[1];

    // Verifica e decodifica o token
    const decodedToken = verify(token, process.env.SECRET_JWT);

    // Adiciona o userId (ou outro identificador) ao objeto req
    req.userId = decodedToken.id; // ou 'id' dependendo do payload

    //console.log("ID do usuário extraído do token:", req.userId);

    // Passa para o próximo middleware
    next();
  } catch (error) {
    console.error("Erro ao verificar o token JWT:", error.message);
    return res.status(401).json({ error: "Acesso negado." });
  }
}

module.exports = { userId };
