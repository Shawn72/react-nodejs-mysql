module.exports = function(io) {
    io.on('connection', (socket) => {
      console.log('********connection established to MySQL********');
      
      socket.on('new-message', (data) => {
        console.log({data: data});
        io.emit('emit-message', {
          message: data
        });
      });
    });
  }