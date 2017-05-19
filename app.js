/**
 */

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%AE%A0%E7%89%A9&step_word=&hs=0&pn=4&spn=0&di=167475198110&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=322490395%2C1509741222&os=3853972451%2C940491286&simid=3303596078%2C365501167&adpicid=0&lpn=0&ln=1982&fr=&fmq=1495163459654_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimage142-c.poco.cn%2Fmypoco%2Fmyphoto%2F20130713%2F21%2F659346182013071321162601.jpg%3F900x600_120&fromurl=ippr_z2C%24qAzdH3FAzdH3F4_z%26e3Br5v5_z%26e3BvgAzdH3Fetft5gAzdH3F1jpwts_z%26e3Brir%3Fri5p5_t1%3Dnmdnn9b&gsm=0&rpstart=0&rpnum=0';


getData(url);
var dir = './images/';
function getData(url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body)
            var src = $('.img-wrapper img').attr('src');
            fs.stat(dir, function (err, stats) {
                if (stats && stats.isDirectory) {
                    copyRemote(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4))
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

