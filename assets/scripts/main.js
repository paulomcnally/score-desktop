var socket = io.connect('http://localhost:35588');

// points handler
socket.on('score', function (data) {
  if (data.team === 'a') {
    document.getElementById('aPoints').innerHTML = data.points;
  }

  if (data.team === 'b') {
    document.getElementById('bPoints').innerHTML = data.points;
  }
});

// name handler
socket.on('name', function (data) {
  if (data.team === 'a') {
    document.getElementById('aName').innerHTML = data.name;
  }

  if (data.team === 'b') {
    document.getElementById('bName').innerHTML = data.name;
  }
});
