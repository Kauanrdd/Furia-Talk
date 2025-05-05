# 🗨️ WebChat - FURIA Challenge

Este é um projeto de WebChat desenvolvido para o desafio técnico da FURIA. O sistema permite a comunicação em tempo real entre usuários via WebSockets.

---

## 📁 Estrutura do Projeto

```
📦 raiz/
├── comandos.html           # Página com comandos e instruções
├── comandos.css            # Estilos específicos para comandos
├── index.html              # Página principal do chat
├── script.js               # Lógica do frontend (WebSocket + UI)
├── style.css               # Estilos do frontend
├── .env                    # Variáveis de ambiente
├── package.json            # Configurações e dependências do Node.js
├── package-lock.json       # Versões travadas das dependências
└── src/
    └── server.js           # Servidor Node.js usando WebSocket
```

---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/kauanrdd/webchat-furia.git
   cd webchat-furia
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure a porta no arquivo `.env`** (já configurado para `8080`):

   ```
   PORT=8080
   ```

4. **Inicie o servidor**:

   - Em modo de desenvolvimento (com watch):
     ```bash
     npm run dev
     ```

   - Em modo de produção:
     ```bash
     npm start
     ```

5. **Acesse no navegador**:

   ```
   http://localhost:8080/index.html
   ```

---

## ⚙️ Tecnologias Utilizadas

- **Node.js**
- **WebSocket (`ws`)**
- **dotenv**
- HTML5, CSS3, JavaScript puro

---

## 🧠 Funcionalidades

- Envio e recepção de mensagens em tempo real
- Interface leve e responsiva
- Suporte a comandos personalizados (via comandos.html)
- Organização modular do código

---

## 📌 Observações

- O frontend é estático e se comunica diretamente com o backend WebSocket.
- O projeto não utiliza frameworks como React ou Vue para manter a simplicidade e leveza.
- O `server.js` está localizado na pasta `src/`.

---

## 👨‍💻 Autor

Desenvolvido por Kauan Rodrigues Dias para o processo seletivo da FURIA.
