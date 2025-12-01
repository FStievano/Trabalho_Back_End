Testes Automatizados do SENAI Bank

Este projeto faz parte do trabalho acadêmico de Testes Backend, cujo objetivo é validar a integridade das operações de transferência do sistema SENAI Bank.
Foram implementados testes unitários e de integração, seguindo boas práticas e cobrindo cenários positivos e negativos.

📌 Objetivo do Projeto

Garantir a qualidade da API de transferências bancárias, assegurando:

Correção matemática das operações

Tratamento de erros

Robustez contra entradas inválidas

Cobertura dos principais fluxos do sistema

O desenvolvedor sênior havia implementado a lógica base, mas faltavam testes e validações, que foram adicionadas neste trabalho.

📂 Estrutura do Projeto
src/
  ├── api.js
  └── bankService.js
tests/
  ├── api.test.js
  └── bankService.test.js
package.json
README.md

🛠 Configuração do Ambiente
1. Instalar dependências
npm install

2. Dependências utilizadas

Jest → Testes unitários

Supertest → Testes de integração das rotas HTTP

Express → API de transferências

🧪 Testes Implementados
✔ Testes Unitários – bankService.test.js

Testam a função transfer() isoladamente.

Cenários cobertos:
Cenário	Descrição
Caminho Feliz	Transferência válida subtrai e adiciona valores corretamente
Saldo Insuficiente	Impede transferências acima do saldo
Valor Zero	Valor igual a 0 é rejeitado
Valor Negativo	Valores negativos são inválidos
Usuário inexistente	Erro ao informar IDs que não existem
✔ Testes de Integração – api.test.js

Utilizam o Supertest para validar a rota POST /transfer como um cliente real faria.

Cenários cobertos:
Cenário	Verificação
200 – Sucesso	Transferência correta retorna status 200
400 – Campo faltando	Falta do campo amount retorna erro
400 – Usuário inexistente	API retorna erro adequado
🔍 Validações adicionadas ao sistema

O bankService.js foi aprimorado para incluir:

Verificação de usuários inexistentes

Proibição de valores ≤ 0

Checagem de saldo insuficiente

Erros claros e consistentes

Essas validações garantem segurança e seguem os princípios ACID.

▶ Rodando os testes
npm test


Se tudo estiver correto, o resultado será:

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total

📑 Cenários de Teste (Tabela do Trabalho)
ID	Tipo	Cenário	Entrada	Resultado Esperado
1	Positivo	Caminho feliz	sender=1, receiver=2, amount=100	200 OK, saldo atualizado
2	Negativo	Saldo insuficiente	amount maior que saldo	Erro "Saldo insuficiente"
3	Limite	Valor zero	amount = 0	Erro "Valor inválido"
4	Limite	Valor negativo	amount = -10	Erro "Valor inválido"
5	Input	Usuário inexistente	senderId ou receiverId inválidos	Erro "Usuário não encontrado"
6	Input	Campo faltando	amount ausente	400 – "Dados incompletos"

👨‍💻 Conclusão

Foram implementados testes unitários e de integração que validam as principais regras da API do SENAI Bank, garantindo confiabilidade e segurança nos processos de transferência.