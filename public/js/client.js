const socket = io();

// Nachricht empfangen
socket.on('message', msg => {
    // Was soll der Client tun, wenn er eine Nachricht bekommt?
});

// Nachricht senden
socket.emit('message', "Hallo Welt");