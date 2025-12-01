const bankService = require('../src/bankService');
const users = bankService._users;

beforeEach(() => {
    // resetando banco de dados fake
    users[0].balance = 1000;
    users[1].balance = 500;
});

describe("Testes Unitários da função transfer()", () => {

    test("Caminho feliz: transferência válida", () => {
        const result = bankService.transfer(1, 2, 100);

        expect(result.success).toBe(true);
        expect(users[0].balance).toBe(900);
        expect(users[1].balance).toBe(600);
    });

    test("Erro: saldo insuficiente", () => {
        expect(() => bankService.transfer(1, 2, 999999))
            .toThrow("Saldo insuficiente");
    });

    test("Erro: valor zero", () => {
        expect(() => bankService.transfer(1, 2, 0))
            .toThrow("Valor inválido");
    });

    test("Erro: valor negativo", () => {
        expect(() => bankService.transfer(1, 2, -50))
            .toThrow("Valor inválido");
    });

    test("Erro: usuário inexistente", () => {
        expect(() => bankService.transfer(999, 2, 50))
            .toThrow("Usuário não encontrado");
    });

});
