const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname,'files-copy'), (error,files)=>{
  if (files){
    files.forEach(file => {
      fs.unlink(path.join(__dirname,'files-copy',file), error => {
        if (error) console.error(error);
      });
    });
  }
});


fs.mkdir(path.join(__dirname,'files-copy'), {recursive : true}, (error) => {
  if (error) console.error(error);
});



fs.readdir(path.join(__dirname,'files'), (error, files) =>{
  if (error) console.error(error);
  files.forEach(file => {
    fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), error => {
      if (error) console.error(error);
    });
  });
});





