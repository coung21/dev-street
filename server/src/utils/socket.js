let users = []

function addNewSocket(){
  
}

function socketHandler(io){
  return io.on('connection', (socket) => {
    console.log(socket.id)
  })
}

module.exports = {socketHandler}