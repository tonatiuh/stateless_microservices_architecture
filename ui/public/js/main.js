window.onload = function() {
  let socket   = io(wss);
  let $chatbox = document.querySelector('#chatbox');

  socket.on('connect', connection => {
    $chatbox.addEventListener('keyup', event => {
      socket.emit('event', {
        current: event.key,
        content: $chatbox.value
      });
    });

    socket.on('action', action => {
      console.log(action);
    });
  });
}
