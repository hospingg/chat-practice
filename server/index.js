const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
