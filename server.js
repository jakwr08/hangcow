// benötigte Pakete einbinden
const fs = require('fs');
const path = require('path');
const http = require('http')
const https = require('https');
const express = require('express');
const socketio = require('socket.io');

// zu verwendenden Port definieren
const PORT = process.env.PORT || 8000;
const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/hangcow.de/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/hangcow.de/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/hangcow.de/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// Server einrichten
const server = https.createServer(credentials, app);
const io = socketio(server);


// Server starten
server.listen(PORT, () => 
	console.log(`Server listening on port ${PORT}...`));

// statische Website bereitstellen
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' } ));


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
