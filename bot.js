var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var giphy = require('giphy-api')();
var r = Math.random();

var botID = process.env.BOT_ID;
var botName = process.env.BOT_NAME;
var nameTarget = process.env.NAME_TARGET;
var specialMessage = process.env.SPECIAL_MESSAGE;
var aiClient = process.env.AI_CLIENT;
var aiDeveloper = process.env.AI_DEVELOPER;
var googleKey = process.env.GOOGLE_KEY;
var googleID = process.env.GOOGLE_ID;
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/;
      triggered = /^\/triggered$/;
      help = /^\/help$/;
      flip = /^\/flip$/;
      yn = /^\/yn$/;

var str = request.text;
// string and removes spaces and repeating
var norstr = str.replace(/[^\w\s]|(.)(?=\1)/g, "");
console.log(str);
//makes true false variables
var msgfind = new RegExp(specialMessage);
var msgres = msgfind.test(norstr);
var chillfind = new RegExp("/chill");
var chillres = chillfind.test(str);
var aifind = new RegExp("ai");
var aires = aifind.test(str);
var giffind = new RegExp("/g");
var gifres = giffind.test(str);
var searchfind = new RegExp("/search");
var searchres = searchfind.test(str);
var webfind = new RegExp(".com");
var webres = webfind.test(str);
//Fallbacks
//Checks if it contains a website
	if(!(webres))
  {
    webfind = new RegExp(".net");
    var webres = webfind.test(str);
    if(!(webres))
      {
        webfind = new RegExp(".org");
        var webres = webfind.test(str);
      }
  }
//Checks if it contains ai or Ai
  if(!(aires))
  {
     aifind = new RegExp("Ai");
     aires = aifind.test(str);
  }
  //Checks all the Chills
  if(!(chillres))
    {
      chillfind = new RegExp("/Chill");
      var chillres = chillfind.test(str);
      if(!(chillres))
        {
          chillfind = new RegExp("/CHILL");
          var chillres = chillfind.test(str);
        }
    }
//End of fallbacks
//Checks for and initates Gif
if(gifres && request.name != botName && !(webres))
{
  var query = str.substr(3);
  getGif(query);
}
//Checks for and initates Search
if(searchres && request.name != botName && !(webres))
{
    var query = str.substr(8);
    if(googleID != undefined)
    search(query);
}
//Checks for and initates ApiAi
if(aires)
  {
    var query = str.substr(3);
    query = query.replace(/\s/g, "+");
    //Makes the query seperated by plus
    if(request.name != botName)
    if(aiClient != undefined)
    apiai(query);
  }
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    var botResponse = cool();
    postMessage(botResponse);
    this.res.end();
  } else if(request.text && triggered.test(request.text)) {
      this.res.writeHead(200);
      var botResponse = "https://i.groupme.com/500x281.gif.9aa0ae471663485c962fdf04fe4dffdc.large";
      postMessage(botResponse);
      this.res.end();
//  } else if(msgres && request.name == nameTarget) {
//        this.res.writeHead(200);
//        var botResponse = "https://i.groupme.com/500x307.gif.38bd79c0db38415cba0333c1120fbff3.large";
//        postMessage(botResponse);
//        this.res.end();
      } else if(chillres && (request.name != botName)) {
            this.res.writeHead(200);
            var botResponse = "https://i.groupme.com/245x292.gif.ca41bed2aaef478b886e0660730c80b2.large";
            postMessage(botResponse);
            this.res.end();
    }   else if(request.text && help.test(request.text)) {
          this.res.writeHead(200);
          var botResponse = "Sup?  I'm Sean 2.0.  Here's what I can do:  1. I'm a meme finder. Type '/g' after or before your search term and I'll return a related meme at random for you ;).  Try typing this: '/g btiches' and see what I'll see what I can do for ya!  Type '/pokemon' to learn how to play!" 
          postMessage(botResponse);
          this.res.end();
  }    
        else if(request.text.startsWith("/flip")) {
          this.res.writeHead(200);
		var r = Math.floor((Math.random() * 100) + 1);
		var theflip = 'Go Fuck Yourself';
		if (r < 100 && r > 95) {
			theflip = 'No';
		} else if (r < 96 && r > 91){
			theflip = 'maybe';
		} else if (r < 92 && r > 87){
			theflip = '1';
		} else if (r < 88 && r > 83){
			theflip = '2';
		} else if (r < 84 && r > 79){
			theflip = '3';
		} else if (r < 80 && r > 75){
			theflip = '4';
		} else if (r < 76 && r > 71){
			theflip = '5';
		} else if (r < 72 && r > 67){
			theflip = '6';
		} else if (r < 68 && r > 63){
			theflip = '7';
		} else if (r < 64 && r > 59){
			theflip = '8';
		} else if (r < 60 && r > 55){
			theflip = '9';
		} else if (r < 56 && r > 51){
			theflip = '0';
		}  else if (r < 52 && r > 47){
			theflip = '22';
		} else if (r < 48 && r > 43){
			theflip = '33';
		} else if (r < 44 && r > 39){
			theflip = '11';
		} else if (r < 40 && r > 35){
			theflip = '44';
		} else if (r < 36 && r > 31){
			theflip = '55';
		} else if (r < 32 && r > 27){
			theflip = '66';
		} else if (r < 28 && r > 23){
			theflip = '77';
		} else if (r < 24 && r > 19){
			theflip = '88';
		} else if (r < 20 && r > 15){
			theflip = '99';
		} else if (r < 16 && r > 11){
			theflip = '00';
		} else if (r < 12 && r > 7){
			theflip = '111';
		} else if (r < 8 && r > 3){
			theflip = '123';
		} else if (r < 4 && r > 0){
			theflip = '333';
		} 
          var botResponse = theflip;
          postMessage(botResponse);
          this.res.end();
  }	  
        else if(request.text && yn.test(request.text)) {
          this.res.writeHead(200);
		var r = Math.random();
		var theflip = 'Yes';
		if (r < 0.5) {
			theflip = 'No';
		}
          var botResponse = theflip ;
          postMessage(botResponse);
          this.res.end();	
	
		  
  }    else { console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}
//Sends to ApiAi
function apiai(query){
var clientAccessToken=aiClient;
pathapi = "/v1/query?lang=EN&query=" + query; //replace with query
var options={
    hostname: 'api.api.ai',
    path: pathapi,
    method: 'GET',
    headers:{
        'Authorization': 'Bearer ' + aiDeveloper
    }
};
	var callback=function(data)
    {
    	console.log(data);
    }
    HTTPS.get(options, function(res){
       body='';
        res.on('data', function(data){
            body+=data;
        });
        res.on('end', function(){
          result=JSON.parse(body);
            callback(result);
            var resultspeech = result.result.speech;
            var botResponse = resultspeech;
            postMessage(botResponse);
        });
    }).on('error', function(e){
        console.log('Error: ' +e);
    });
  }

//**************************************************************************
/*Flips coin
function flipcoin() {

  var r = Math.random();
  var botResponse = 'heads';
  if (r < 0.5) {
    botResponse = 'tails';
    postMessage(botResponse);  
}
*/
//*************************************************************************

  //Sends to Giphy to get Gif
  function getGif(query)
  {
  giphy.translate({
      s: query,
      //rating: 'g',
      fmt: 'json'
  }, function(err, res) {
      // Res contains gif data!
      console.log(res);
      if(res.data == "")
      postMessage("No results, Sorry");
      else
      postMessage(res.data.images.original.url);
  });
  }
//Sends to Google Search(If you think it's broken, remember you only get 100 searches a day)
  function search(query)
  {
     urlsearch = "https://www.googleapis.com/customsearch/v1?key="+googleKey+"&cx="+googleID+"&q=" + query;
     var callback=function(data)
       {

       }
       HTTPS.get(urlsearch, function(res){
          body='';
           res.on('data', function(data){
               body+=data;
           });
           res.on('end', function(){
             result=JSON.parse(body);
               callback(result);
              var searchLink = result.items[0].link;
              var searchSnippet = result.items[0].snippet;
               var botResponse = searchSnippet + " The link is " + searchLink;
               postMessage(botResponse);
           });
       }).on('error', function(e){
           console.log('Error: ' +e);
       });
  }
//Post to Groupme
function postMessage(botResponse) {
  var options, body, botReq;
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
