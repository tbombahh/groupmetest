var HTTPS = require('https');
var HTTP = require('http');
var cool2 = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var apiKey = process.env.API_KEY;

##giphy code
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      giphyCommand = '/giphy';

  if(request.text &&
     request.text.length > giphyCommand.length &&
     request.text.substring(0, giphyCommand.length) === giphyCommand) {
    this.res.writeHead(200);
    searchGiphy(request.text.substring(giphyCommand.length + 1));
    this.res.end();
  } else {
    this.res.writeHead(200);
    this.res.end();
  }
}

function searchGiphy(giphyToSearch) {
  var options = {
    host: 'api.giphy.com',
    path: '/v1/gifs/search?q=' + encodeQuery(giphyToSearch) + '&api_key=' + apiKey
  };

  var callback = function(response) {
    var str = '';

    response.on('data', function(chunck){
      str += chunck;
    });

    response.on('end', function() {
      if (!(str && JSON.parse(str).data[0])) {
        postMessage('Couldn\'t find a gif 💩');
      } else {
        var id = JSON.parse(str).data[0].id;
        var giphyURL = 'http://i.giphy.com/' + id + '.gif';
        postMessage(giphyURL);
      }
    });
  };

  HTTP.request(options, callback).end();
}

function encodeQuery(query) {
  return query.replace(/\s/g, '+');;
}


## Original
/* function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guyy$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
*/
function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool2();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
