const login = document.querySelector(".login");
const loginForm = login.querySelector(".login__form");
const loginInput = login.querySelector(".login__input");

const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");

const colors = ["cadetblue", "darkgoldenrod", "cornflowerblue", "darkkhaki", "hotpink", "gold"];
const user = { id: "", name: "", color: "" };
let websocket;

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const createMessageSelfElement = (content) => {
  const div = document.createElement("div");
  div.classList.add("message--self");
  div.textContent = content;
  return div;
};

const createMessageOtherElement = (content, sender, senderColor) => {
  const div = document.createElement("div");
  const span = document.createElement("span");
  span.classList.add("message--sender");
  span.style.color = senderColor;
  span.textContent = sender + ": ";
  div.classList.add("message--other");
  div.appendChild(span);
  div.append(content);
  return div;
};

const scrollScreen = () => {
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const adicionarMensagemSistema = (texto) => {
  const msgEl = document.createElement("div");
  msgEl.textContent = texto;
  msgEl.style.color = "#DAA520";
  msgEl.style.fontStyle = "italic";
  msgEl.classList.add("mensagem-sistema");
  chatMessages.appendChild(msgEl);
  scrollScreen();
};

const mostrarLineup = () => {
  const lineup = [
    "👑 Fallen (Gabriel Toledo )",
    "💣 yuurih (Yuri Santos)",
    "🎯 KSCERATO (Kaike Silva Cerato)",
    "⚡ Yekindar (Mareks Gaļinskis)",
    "🔥 Molodoy (Danil Golubenko)",
  "🧠 Sidde (Sidnei Macedo - COACH)",
  "🧠 Hepa (Juan Borges - COACH)"
  ];
  adicionarMensagemSistema(`Lineup da FURIA:\n${lineup.join("\n")}`);
};

const mostrarConquistas = () => {
  const conquistas = [
    "🏆 Elisa Masters Espoo (2023)",
    "🏆 IEM New York (2020)",
    "🏆 ESL Pro League Season 12 North America (2020)",
    "🏆 DreamHack Masters Spring - North America (2020)"
  ];
  adicionarMensagemSistema(`Conquistas da FURIA:\n${conquistas.join("\n")}`);
};

const interpretarComando = (mensagem) => {
  const partes = mensagem.trim().split(" ");
  const comando = partes[0];
  const argumento = partes.slice(1).join(" ");

  switch (comando) {
    case "/nick":
      user.name = argumento || "Convidado";
      adicionarMensagemSistema(`Seu novo nick é ${user.name}`);
      break;
    case "/color":
      user.color = argumento || "#EBEBEB";
      adicionarMensagemSistema(`Cor alterada para ${user.color}`);
      break;
    case "/limpar":
      chatMessages.innerHTML = "";
      break;
    case "/lineup":
      mostrarLineup();
      break;
    case "/conquistas":
      mostrarConquistas();
      break;
    default:
      adicionarMensagemSistema(`Comando desconhecido: ${comando}`);
  }
};

const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data);

  const msgEl =
    userId === user.id
      ? createMessageSelfElement(content)
      : createMessageOtherElement(content, userName, userColor);

  chatMessages.appendChild(msgEl);
  scrollScreen();
};

const handleLogin = (event) => {
  event.preventDefault();

  user.id = crypto.randomUUID();
  user.name = loginInput.value.trim() || "Convidado";
  user.color = getRandomColor();

  login.style.display = "none";
  chat.style.display = "flex";

  websocket = new WebSocket("ws://localhost:8080");
  websocket.onmessage = processMessage;
};

const sendMessage = (event) => {
  event.preventDefault();

  const content = chatInput.value.trim();
  if (!content) return;

  if (content.startsWith("/")) {
    interpretarComando(content);
  } else {
    const message = {
      userId: user.id,
      userName: user.name,
      userColor: user.color,
      content
    };
    websocket.send(JSON.stringify(message));
  }

  chatInput.value = "";
};

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);