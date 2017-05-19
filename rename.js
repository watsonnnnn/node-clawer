var fs = require('fs');
var path = require('path')
var dir = path.join(__dirname,'./images');
fs.stat(dir,function(err,stats){
  if(err){
    console.log('read error',err.message);
  }else{
    if(stats.isDirectory()){
      console.log('is directory');
      fs.readdir(dir,function(err,files){
        (function next(i){
          if(i<files.length){
            // console.log(files[i].endsWith('.jpg'));
            if(!files[i].endsWith('.jpg')){
              var oldpath = path.join(dir,files[i]);
              var newpath = path.join(dir,files[i]+'.jpg');
              fs.rename(oldpath,newpath,function(err){
                if(err){
                  console.log('rename error');
                }
              })
            }
              next(++i);
          }else{
            console.log('all rename ok!')
          }
        })(0);
      })
    }
  }
})
