/**
 */

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'https://www.poocg.com/index.php';


getData(url);
var dir = './images/';
function getData(url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var srcArr = [];
            // console.log($('div.imgbox'));
            $('div.imgbox').each(function(index,item){
              // console.log($(this).find('img'));
              // console.log('>>>>>>>>>>>>>>>>>>>')
              var src = $(this).find('img').attr('src');
              srcArr.push(src);
            });
            // console.log(srcArr)
            fs.stat(dir, function (err, stats) {
                if (stats && stats.isDirectory()) {
                  for(var i = 0;i<srcArr.length;i++){
                    (function(index){
                      copyRemote(srcArr[index], dir, Math.floor(Math.random() * 100000) + srcArr[index].substr(-4, 4))
                    })(i);
                  }
                } else {
                    fs.mkdir(dir, function (err) {
                        if (!err) {
                            copyRemote(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4))
                        }
                    })
                }
            })
        } else {
            console.log('problem with request:', error.message);
        }
    });
};
function copyRemote(origin, dest, filename) {
    var req = request(origin);
    req.on('response', function (response) {
        if (response.statusCode == 200) {
            console.log(`fetch ${origin} successfully`);
            req.pipe(fs.createWriteStream(dir + "/" + filename));
        }else{
            console.log(`error code is ${response.statusCode},res type is ${response.headers['content-type']}`);
        }
    });
}
