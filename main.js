var http = require('http');
var cheerio  = require('cheerio')
var request = require('request')
var options = {
hostname: 'image.baidu.com',
port: 80,
path: '/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=0&pn=0&spn=0&di=157070280620&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=4271053251%2C2424464488&os=2375022793%2C1835605452&simid=4247939438%2C550168575&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fpic55.nipic.com%2Ffile%2F20141208%2F19462408_171130083000_2.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bgtrtv_z%26e3Bv54AzdH3Fzi7wgptAzdH3F8c8n9d9_d_z%26e3Bip4s&gsm=0',
method: 'GET'
};
//默认协议http hostname里不要写http！！

var html = '';
var req = http.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    html+=chunk;
  });
  res.on('end', () => {
    console.log('No more data in response.');
    console.log(html);
    var $ = cheerio.load(html)
  });
});

req.on('error', function(e) {
console.log('problem with request: ' + e.message);
});
// write data to request body
req.write('data\n');
req.end();
