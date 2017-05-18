var http = require('http');
var cheerio  = require('cheerio')
var request = require('request')
var options = {
hostname: 'http://v.163.com',
port: 80,
path: '/special/opencourse/englishs1.html',
method: 'GET'
};

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
