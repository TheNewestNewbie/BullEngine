const express = require('express');
const path = require('path');

const BullEngine = (gameName, port) => {
  const app = express();
  const PORT = port || process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, 'visualEngine'), { 'extensions': ['js'] }));

  const setEngineFolder = (path) => {
    app.use(express.static(path, { 'extensions': ['js'] }));
  }

  const setAssetsFolder = (path) => {
    app.use(express.static(path));
  }

  const scriptData = "";

  const addScript = (script) => {
  }
  scriptData += `
  ${script}`;

  const addScriptFile = (name) => {
    scriptData += `
    <script type="text/javascript" src="${name}"></script>`
  }

  const start = () => {
    app.get('/', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${gameName || "Test Game"}</title>
    <script type="text/javascript" src="_import.js"></script>
    <script type="text/javascript" src="_main.js"></script>
    
  </head>
  <body>
    
    ${scriptData}
  </body>
  </html>`);
      res.end();
    });

    app.listen(PORT, () => {
      console.log(`BullEngine running on http://localhost:${PORT}`);
    });

  }

  return {
    app,
    PORT,
    setEngineFolder,
    setAssetsFolder,
    addScript,
    addScriptFile,
    start
  };

};