const { stdout } = process;
const fs = require('fs');
const path = require('path');

async function getFileInfo(file){
  if (file.isFile()){
    const fileInfo = await  fs.promises.stat(path.join(__dirname,'secret-folder',file.name));
    stdout.write([path.basename(file.name,path.extname(file.name)), path.extname(file.name), fileInfo.size/1000+'kb\n' ].join(' - '));
  }
}

async function getFileNames(){
  try{
    const files =  await fs.promises.readdir(path.join(__dirname,'secret-folder'), {withFileTypes: true});
    files.forEach(file=>getFileInfo(file));
  } catch (err){
    console.error(err);
  }
}

getFileNames();