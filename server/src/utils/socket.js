let users = [];

function addNewSocket(userId, socketId) {
  const user = users.find((item) => item.id === userId);
  if (user && user.socketId === socketId) {
    return users;
  } else {
    if (user && user.socketId !== socketId) {
      removeSocket(socketId);
    }
    const newUser = { id: userId, socketId };
    users.push(newUser);
    return users;
  }
}

function removeSocket(socketId) {
  users = users.filter((item) => item.socketId !== socketId);

}

function findConnectedUser (userId) {
  return users.find((item) => item.id === userId);
};

// function findDisconnetingUser (socketId){

// }

function socketHandler(io) {
  io.use((socket, next) => {
    const { query } = socket.handshake;
    const { userId } = query;
    // console.log(userId)
    socket.data.userId = userId;

    next();
  });
  return io.on('connection', (socket) => {
    socket.on('join', ({ userId, socketId }) => {
      const userSockets = addNewSocket(userId, socketId);
       console.log(`connected: `,userSockets)

        // console.log(`user ${userId} just join with socket ${socketId}`)
    });

    socket.on('like',({sender, receiver, postId}) => {
      const receiverSocket = findConnectedUser(receiver.id);
      if(receiverSocket){
        io.to(receiverSocket.socketId).emit('notification', {
          senderName: sender.username,
          receiverName: receiver.username,
          type: 'like',
          postId: postId
        });
      }
    })

    socket.on('bookmark', ({ sender, receiver, postId }) => {
      const receiverSocket = findConnectedUser(receiver.id);
      if (receiverSocket) {
        io.to(receiverSocket.socketId).emit('notification', {
          senderName: sender.username,
          receiverName: receiver.username,
          type: 'bookmark',
          postId: postId
        });
      }
    });

    socket.on('disconnect', () => {
      users.find(item => item.socketId === socket.id)
      removeSocket(socket.id);
      // console.log(`user ${disconnectingUser.id} just disconnected`)
      console.log(`connected: `, users);
    });
  });
}

module.exports = { socketHandler };
