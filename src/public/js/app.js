const socket = io();

const nick = document.getElementById("nick");
const form = nick.querySelector("form");
const welcome = document.getElementById("welcome")
const room = document.getElementById("room");

welcome.hidden = true;
room.hidden = true;

let roomName;
let nickName;

function addMessage(message){
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event){
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event){
  event.preventDefault();
  const input = nick.querySelector("input");
  socket.emit("nickname", input.value ,showNickname);
  nickName = input.value;
}

function showNickname(){
  welcome.hidden = false;
  nick.hidden = true;
  const h3 = welcome.querySelector("h3");
  h3.innerText = `Welcome ${nickName}`
  const roomForm = welcome.querySelector("form");
  roomForm.addEventListener("submit", handleRoomSubmit);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const h4 = room.querySelector("h4");
  h4.innerText = `Nickname: ${nickName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event){
  event.preventDefault();
  const input = welcome.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}


form.addEventListener("submit", handleNicknameSubmit);

socket.on("welcome", (user) => {
 addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (msg) => (rooms) => {
  roomList.innerHTML = "";
  if(rooms.length === 0){
    return;
  }
  const roomList = welcome.querySelector("ul");
  rooms.array.forEach(room => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

