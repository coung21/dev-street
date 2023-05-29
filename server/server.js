const server = require('./src/app');
const process = require('process');
require('dotenv').config();
const {
  app: { port },
} = require('./src/config/config');

const PORT = port || 3045;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// process.on('SIGINT', () =>{
//   server.close(() => {
//     console.log('Exit Server')
//   })
// })
