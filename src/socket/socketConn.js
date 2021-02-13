import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://api-buca-chat.herokuapp.com/';
const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket'],
  upgrade: false,
});

export default socket;
