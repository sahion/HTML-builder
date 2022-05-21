const fs = require('fs');
const path = require('path');
const { stdout } = process;


let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});

stream.on('readable', () =>{

  let data = stream.read();
  if (data) stdout.write(data);
});


