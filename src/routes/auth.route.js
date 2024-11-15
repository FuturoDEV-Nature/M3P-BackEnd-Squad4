
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role= require('../models/Role');
const Permission = require('../models/Permission');

router.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send('Email e senha são obrigatórios');
    }
    

    const usuario = await User.findOne({
      where:{email:email},
      include: [{ model: Role, as: 'roles', through: { attributes: [] }, 
        include:[{ model: Permission, as: 'permissions', through: { attributes: [] } }]
      }],
    });
	// console.log("Usuário ::::::");
	// console.log(JSON.stringify(usuario, null, 2)); // Formatação para visualização clara
	
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).send('Senha incorreta');
    }

    const payload = { 
		id: usuario.id,
		email: usuario.email,
		roles: usuario.roles
	};

    const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '12h' });	// token válido por 12 horas
    res.status(200).json({token});

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
