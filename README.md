# ⚡ EnergiaSegura – Registro de Falta de Energia
## 🚀 Projeto realizado para a entrega da Global Solution 2025
Aplicativo mobile desenvolvido com **React Native** que permite o registro e visualização de eventos de **falta de energia causados por desastres naturais**, como chuvas, ventos fortes ou deslizamentos. O app é totalmente funcional com **armazenamento local** usando `AsyncStorage`.


## ✨ Alunos:
- Camila do Prado Padalino - RM98316
- Gabriel Teixeira Machado - RM551570
- Guilherme Brazioli - RM98237

## 📲 Funcionalidades

### 👤 Cadastro de Usuário
- Campos: nome, e-mail e telefone
- Sempre solicitado antes de cada novo evento
- Os dados são mostrados junto aos registros

### ✅ Registro de Evento
O fluxo de registro é dividido em etapas:
1. **Localização Atingida** – Bairro e cidade
2. **Tempo de Interrupção** – Ex: 2h30
3. **Prejuízos Causados** – Adição de múltiplos prejuízos
4. **Recomendações** – Boas práticas antes de salvar o evento

## ▶️ Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Iniciar app com Expo
npx expo start
