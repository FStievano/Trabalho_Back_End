const request = require('supertest');
const app = require('../src/api');
const bankService = require('../src/bankService');
const users = bankService._users;

beforeEach(() => {
    users[0].balance = 1000;
    users[1].balance = 500;
});

describe("Testes de integração na rota POST /transfer", () => {

    test("Deve retornar 200 no caminho feliz", async () => {
        const res = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2, amount: 100 });

        expect(res.status).toBe(200);
        expect(users[0].balance).toBe(900);
    });

    test("Deve retornar 400 quando faltar amount", async () => {
        const res = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Dados incompletos");
    });

    test("Deve retornar erro quando usuário não existir", async () => {
        const res = await request(app)
            .post('/transfer')
            .send({ senderId: 999, receiverId: 2, amount: 50 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Usuário não encontrado");
    });

});
