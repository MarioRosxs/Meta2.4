// server.js
const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const personaRouter = require('./routes/personasRoutes');
const donadorRouter = require('./routes/donadorRoutes');
const proyectoRouter = require('./routes/proyectoRoutes');

app.use(cors());
app.use(express.json());
app.use('/personas', personaRouter);
app.use('/donador', donadorRouter);
app.use('/proyecto', proyectoRouter);

process.env.PORT = 3000;

const llavePrivada = fs.readFileSync('private.key');
const certificado = fs.readFileSync('certificate.crt');
const credenciales = {
  key: llavePrivada,
  cert: certificado,
  passphrase: 'Maya1862',
};

const httpsServer = https.createServer(credenciales, app);

httpsServer.listen(process.env.PORT, () => {
  console.log('Servidor https escuchando por el puerto:', process.env.PORT);
}).on('error', (err) => {
  console.log('Error al iniciar servidor:', err);
});
