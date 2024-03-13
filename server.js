// benötigte Pakete einbinden
const path = require('path');
const http = require('http')
const express = require('express');
const socketio = require('socket.io');

// zu verwendenden Port definieren
const PORT = process.env.PORT || 80;

// Server einrichten
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Server starten
server.listen(PORT, () => 
	console.log(`Server listening on port ${PORT}...`));

// statische Website bereitstellen
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', socket => {
	// Was soll beim Aufbau der Socket-Verbindung passieren?    
	
	// Nachricht empfangen
    socket.on('message', msg => {
        // Was soll der Server tun, wenn er eine Nachricht bekommt?
		
		// Nachricht an den Client senden
	    socket.emit('message', 'Meine Nachricht');
	    
		// Nachricht an alle anderen Clients senden
	    socket.broadcast.emit('message', 'Meine Nachricht');
	    
	    // Nachricht an alle Clients senden
	    socket.emit('message', "Meine Nachricht");
    });
    
    socket.on('disconnect', () => {
		// Was soll beim Beenden der Socket-Verbindung passieren?    
    });
}); 