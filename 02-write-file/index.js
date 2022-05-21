const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

function exit(){
  stdout.write('Пока');
  process.exit(0);
}


stdout.write('Введите текст\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    exit();
  }
  fs.appendFile(
    path.join(__dirname,'text.txt'),
    data,
    (error) => {
      if (error) throw error;
      
    }
  );

});


process.on('SIGINT', exit);