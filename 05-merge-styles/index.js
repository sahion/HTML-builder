const fs = require('fs');
const path = require('path');


fs.writeFile(path.join(__dirname,'project-dist','bundle.css'), '', err => {
  if (err) console.error(err);
});

fs.readdir(path.join(__dirname,'styles'), {withFileTypes:true} , (err, files) =>{
  if (err) console.error(err);
  files.forEach(file =>{
    if (file.isFile() && path.extname(file.name) === '.css'){
      let data = new fs.ReadStream(path.join(__dirname, 'styles', file.name ), {encoding: 'utf-8'});
      data.on('readable', ()=>{
        
        styles = data.read();
        if (styles)
        fs.appendFile(path.join(__dirname,'project-dist','bundle.css'), styles, err => {
          if (err) console.error(err);
        });
      });
      
    }
  });



 
});


