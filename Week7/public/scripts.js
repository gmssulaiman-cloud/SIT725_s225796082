const socket = io();

const statusInput = document.getElementById('statusInput');
const sendBtn = document.getElementById('sendBtn');
const statusList = document.getElementById('statusList');
const welcome = document.getElementById('welcome');

socket.on('welcome', (msg) => {
  welcome.textContent = msg;
});

socket.on('newStatus', (statusText) => {
  const li = document.createElement('li');
  li.textContent = statusText;
  statusList.prepend(li);
});

sendBtn.addEventListener('click', () => {
  const statusText = statusInput.value.trim();
  if (statusText !== '') {
    socket.emit('postStatus', statusText);
    statusInput.value = '';
    statusInput.focus();
  }
});