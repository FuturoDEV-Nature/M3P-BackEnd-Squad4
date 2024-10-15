'use strict';

const bcrypt = require('bcrypt'); // Importando a biblioteca bcrypt

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
            {
                name: 'Maria Santa',
                sexo: 'feminino',
                cpf: '22222222222',
                email: 'santa@gmail.com',
                senha: await bcrypt.hash('123', 10), 
                data_nascimento: new Date('1990-12-25'),
				cep: "7723-980",
                endereco: 'Rua Dias da Cruz, 420',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'João Silva',
                sexo: 'masculino',
                cpf: '33333333333',
                email: 'joao@gmail.com',
                senha: await bcrypt.hash('123', 10),
                data_nascimento: new Date('1985-06-15'),
                endereco: 'Avenida Brasil, 1000',
				cep: "12345-123",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Ana Oliveira',
                sexo: 'feminino',
                cpf: '44444444444',
                email: 'ana@gmail.com',
                senha: await bcrypt.hash('123', 10),
                data_nascimento: new Date('1992-03-10'),
				cep: "99873-456",
                endereco: 'Rua da Paz, 12',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Carlos Pereira',
                sexo: 'masculino',
                cpf: '55555555555',
                email: 'carlos@gmail.com',
                senha: await bcrypt.hash('123', 10),
                data_nascimento: new Date('1988-11-30'),
				cep: "12343-789",
                endereco: 'Travessa do Sol, 45',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Luana Martins',
                sexo: 'feminino',
                cpf: '66666666666',
                email: 'luana@gmail.com',
                senha: await bcrypt.hash('123', 10),
                data_nascimento: new Date('1995-01-20'),
                cep: "56409-123",
				endereco: 'Rua do Campo, 78',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
