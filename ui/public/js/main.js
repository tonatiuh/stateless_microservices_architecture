window.onload = function() {
  // NOTE: `io` comes from the `socket.io` package
  let socket   = io(wss);
  let $chatbox = document.querySelector('#chatbox');

  socket.on('connect', connection => {
    var $localStudentId = document.getElementById('local-student-id');
    $localStudentId.innerText = `Student ID: ${socket.id}`;

    $chatbox.addEventListener('keyup', event => {
      socket.emit('event', {
        current: event.key,
        content: $chatbox.value
      });
    });

    socket.on('action', action => {
      if (socket.id === action.metadata.socketId) return;

      const $otherStudentsWork = document.getElementById('other-students-work');
      var $studentWork = document.querySelectorAll(`#other-students-work #${action.metadata.socketId}`);

      if ($studentWork.length) {
        var $textArea = document.querySelectorAll(`#other-students-work #${action.metadata.socketId} textarea`)[0];
      }
      else {
        var $studentWork = document.createElement('div');
        $studentWork.setAttribute('id', action.metadata.socketId);
        $otherStudentsWork.appendChild($studentWork);

        var $title = document.createElement('h2');
        $title.setAttribute('class', 'title');
        $title.innerText = `Student ID: ${action.metadata.socketId}`;
        $studentWork.appendChild($title);

        var $textArea = document.createElement('textarea');
        $textArea.setAttribute('disabled', 'disabled');
        $studentWork.appendChild($textArea);
      }

      $textArea.value = action.payload.content;
      console.log(action);
    });
  });
}
