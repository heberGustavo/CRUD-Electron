const { app } = require('electron');
const { createWindow } = require('./main');

require('./database'); /*Executa somente uma vez */
require('electron-reload')(__dirname); /*Executa automaticamente ao salvar*/

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow); //Quando estiver tudo pronto cria a tela