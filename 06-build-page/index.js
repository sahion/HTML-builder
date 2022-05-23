const fs = require('fs');
const path = require('path');


/* INDEX.HTML */


let templateMarkup = '';

fs.mkdir(path.join(__dirname,'project-dist'), {recursive : true}, (error) => {
  if (error) console.error(error);
});

let template = new fs.ReadStream(path.join(__dirname, 'template.html'),  {encoding: 'utf-8'});

template.on('readable', () => {
  const chunk = template.read();
  if (chunk){
    templateMarkup += chunk;
  }
});


template.on('end', () => {
  const components = templateMarkup.matchAll('{{[a-z]*}}');

  for (const component of components){
    
    const componentName = component[0].slice(2,-2);
    let componentFile = new fs.ReadStream(path.join(__dirname, 'components', componentName + '.html'),  {encoding: 'utf-8'});
    componentFile.on('readable', () => {
      const chunk = componentFile.read();
      if (chunk){
        templateMarkup = templateMarkup.slice(0,templateMarkup.indexOf(component[0]))
       + chunk
       + templateMarkup.slice(templateMarkup.indexOf(component[0])+component[0].length);

      }
    });

    componentFile.on('end', () => {
      fs.writeFile(path.join(__dirname,'project-dist','index.html'), templateMarkup, err => {
        if (err) console.error(err);
      });
    });
  }
});



/* STYLE.CSS */


fs.writeFile(path.join(__dirname,'project-dist','style.css'), '', err => {
  if (err) console.error(err);
});

fs.readdir(path.join(__dirname,'styles'), {withFileTypes:true} , (err, files) =>{
  if (err) console.error(err);
  files.forEach(file =>{
    if (file.isFile() && path.extname(file.name) === '.css'){
      let data = new fs.ReadStream(path.join(__dirname, 'styles', file.name ), {encoding: 'utf-8'});
      data.on('readable', ()=>{
        
        const styles = data.read();
        if (styles)
          fs.appendFile(path.join(__dirname,'project-dist','style.css'), styles, err => {
            if (err) console.error(err);
          });
      });
      
    }
  });



 
});


/* ASSETS FOLDER */


async function copyFiles(sourceFolder,destinationFolder){
  await fs.readdir(sourceFolder,  {withFileTypes: true}, (err,files) => {

    files.forEach(file => {
      if (file.isFile()){
        fs.copyFile(path.join(sourceFolder, file.name), path.join(destinationFolder, file.name), error => {
          if (error) console.error(error);
        });
      } else if (file.isDirectory()){
        fs.mkdir(path.join(destinationFolder,file.name), {recursive : true}, (error) => {
          if (error) console.error(error);
        });
        copyFiles(path.join(sourceFolder,file.name),path.join(destinationFolder,file.name));
      }
    });

  });
  
}

async function makeAssetsFolder(){


  await fs.readdir(path.join(__dirname,'project-dist','assets'), (error,files)=>{
    if (files){
      files.forEach(file => {
        (async function(){
          await fs.rm(path.join(__dirname, 'project-dist', 'assets',file), {recursive: true, force: true} , error => {
            if (error) console.error(error);
          });
        });
      });
    }
  });
  
  
  await fs.mkdir(path.join(__dirname,'project-dist', 'assets'), {recursive : true}, (error) => {
    if (error) console.error(error);
    
  });
  
  
  await copyFiles(path.join(__dirname,'assets'), path.join(__dirname, 'project-dist', 'assets'));

}

makeAssetsFolder();




 