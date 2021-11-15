const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to server ");
});

socket.addEventListener("message", (message) => {
  console.log("Just got this: ", message, " from the server");
});

socket.addEventListener("close", () => {
  console.log("Connected from server X ");
});
