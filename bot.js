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

function respond()
{
	var request = JSON.parse(this.req.chunks[0]),
	botRegex = /^\/cool guy$/;
	triggered = /^\/triggered$/;
	help = /^\/help$/;
	meball = /^\/8/;
	yn = /^\/yn/;
	member = /^\/name/;
	flip = /^\/flip$/;
	about = /^\/about$/;

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
		if(googleID != 'AIzaSyCKDiariOtWalhK4Qet46cIYi-StbMODWM')
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
	} 
	  //Help Text Section
	  else if(request.text && help.test(request.text)) {
		this.res.writeHead(200);
		helpMe();
		this.res.end();
	} 
	  //About Me Text Section
	  else if(request.text && about.test(request.text)) {
		this.res.writeHead(200);
		aboutMe();
		this.res.end();
	} 
	  //Magic 8 Ball Code
	  else if(request.text && meball.test(request.text)) {
		  this.res.writeHead(200);
		  eightBall();
		  this.res.end();
					
	} 
	  //Yes or No Answer Section
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
	
	}  
	//Random Name Section
	  else if(request.text && member.test(request.text)) {
		  this.res.writeHead(200);
		  pickName();
		  this.res.end();
	
	}  
	  //Coin Flip Section
	  else if(request.text && flip.test(request.text)) {
		this.res.writeHead(200);
		coinFlipper();
		this.res.end();	
	
	} else {
		console.log("don't care");
		this.res.writeHead(200);
		this.res.end();
	}
}

//Sends to ApiAi
function apiai(query)
{
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

//Help Function Code 
function helpMe()
{
	var botResponse = "Here's what I can do: \n \n" + 
	"1. I'm a Meme Finder.  Type '/g' before your search term and I'll return a related .gif from the internet! \n \n" +
	"2. I'm a Yes/No-er.  Type '/yn' before your search term and I'll return a Yes or No to your question! \n \n" +
	"3. I'm a Coin Flipper.  Type '/flip' to flip a coin! \n \n" +
	"4. I'm a Magic 8 Ball.  Type '/8' to get your fortune! \n \n" +
	"Let Me know if there is anything else you want me to do :)"
	postMessage(botResponse);
}

//About Me  Function Code
function aboutMe()
{
	var botResponse = "I've been created by TBomb with the help of the GitHub community.  " +
			"I am version 3.0.1 and the last time I was updated was on 5/25/18.  " +
	    		"Release details are: cleaned up code."
	postMessage(botResponse);
}



//*****************************************************************
//Pick a Random Name
function pickName()
{
	var r = Math.floor((Math.random() * 100) + 1);
	var magic = "4";				
	if (r < 100 && r > 94) {
		magic = "Joe";
	} else if (r < 95 && r > 89){
		magic = "Bryant";
	} else if (r < 90 && r > 84){
		magic = "Justin";
	} else if (r < 85 && r > 79){
		magic = "Kryger";
	} else if (r < 80 && r > 74){
		magic = "Dylan";
	} else if (r < 75 && r > 69){
		magic = "Ryan";
	} else if (r < 70 && r > 64){
		magic = "Connor";
	} else if (r < 65 && r > 59){
		magic = "Jimmy";
	} else if (r < 60 && r > 54){
		magic = "Gruber";
	} else if (r < 55 && r > 49){
		magic = "Richie";
	} else if (r < 50 && r > 44){
		magic = "Maloney";
	} else if (r < 45 && r > 39){
		magic = "Taylor";
	} else if (r < 40 && r > 34){
		magic = "Jason";
	} else if (r < 35 && r > 29){
		magic = "Nick";
	} else if (r < 30 && r > 24){
		magic = "Me";
	} else if (r < 25 && r > 19){
		magic = "Romano";
	} else if (r < 20 && r > 14){
		magic = "Corby";
	} else if (r < 15 && r > 9){
		magic = "Vinny";
	} else if (r < 10 && r > 4){
		magic = "No one";
	} else if (r < 5 && r > 0){
		magic = "Everyone";
	} 
	
	//This is rolling for a 2nd name in case it gets used in a response
	var r2 = Math.floor((Math.random() * 100) + 1);
	var magic2 = "anyone else";				
	if (r2 < 100 && r2 > 94) {
		magic2 = "Joe";
	} else if (r2 < 95 && r2 > 89){
		magic2 = "Bryant";
	} else if (r2 < 90 && r2 > 84){
		magic2 = "Justin";
	} else if (r2 < 85 && r2 > 79){
		magic2 = "Kryger";
	} else if (r2 < 80 && r2 > 74){
		magic2 = "Dylan";
	} else if (r2 < 75 && r2 > 69){
		magic2 = "Ryan";
	} else if (r2 < 70 && r2 > 64){
		magic2 = "Connor";
	} else if (r2 < 65 && r2 > 59){
		magic2 = "Jimmy";
	} else if (r2 < 60 && r2 > 54){
		magic2 = "Gruber";
	} else if (r2 < 55 && r2 > 49){
		magic2 = "Richie";
	} else if (r2 < 50 && r2 > 44){
		magic2 = "Maloney";
	} else if (r2 < 45 && r2 > 39){
		magic2 = "Taylor";
	}  else if (r2 < 40 && r2 > 34){
		magic2 = "Me!";
	} else if (r2 < 35 && r2 > 29){
		magic2 = "Nick";
	} else if (r2 < 30 && r2 > 24){
		magic2 = "Jason";
	} else if (r2 < 25 && r2 > 19){
		magic2 = "Romano";
	} else if (r2 < 20 && r2 > 14){
		magic2 = "Corby";
	} else if (r2 < 15 && r2 > 9){
		magic2 = "Vinny";
	} 
	// Splitting responses so the ending isnt always the same for each person.
	var rr = Math.floor((Math.random() * 100) + 1);
	var ending = " ";
	if (rr < 100 && rr > 94) {
		ending = " ";
	} else if (rr < 95 && rr > 89){
		ending = " ";
	} else if (rr < 90 && rr > 84){
		ending = "is what my crystal BALLS say!";
	} else if (rr < 85 && rr > 79){
		ending = "fo sho";
	} else if (rr < 80 && rr > 74){
		ending = " ...duh! ";
	} else if (rr < 75 && rr > 69){
		ending = "of course";
	} else if (rr < 70 && rr > 64){
		ending = " ";
	} else if (rr < 65 && rr > 59){
		ending = "all the way!";
	} else if (rr < 60 && rr > 54){
		ending = " ";
	} else if (rr < 55 && rr > 44){
		ending = "or " + magic2;
	} else if (rr < 45 && rr > 39){
		ending = magic + "! " + magic + "!";
	} else if (rr < 40 && rr > 34){
		ending = " ";
	}  else if (rr < 35 && rr > 29){
		ending = " ";
	} else if (rr < 30 && rr > 24){
		ending = " .... regrettably ";
	} else if (rr < 25 && rr > 19){
		ending = " ";
	} else if (rr < 20 && rr > 14){
		ending = "without a doubt";
	} else if (rr < 15 && rr > 9){
		ending = " but definitely not " +magic2;
	} else if (rr < 10 && rr > 4){
		ending = " ";
	} 
	
	var botResponse = magic + " " + ending;
	postMessage(botResponse);
}


//Play with Magic 8Ball
function eightBall()
{
	var r = Math.floor((Math.random() * 100) + 1);
	var magic = "You can ask all you want.  It doesn't mean I'll answer.  Try again though ;)";
					
	if (r < 100 && r > 92) {
		magic = "It is certain";
	} else if (r < 93 && r > 9){
		magic = "I have no clue and I would say ask the 9 ball, but 7 8 9";
	} else if (r < 92 && r > 87){
		magic = "Ask again later";
	} else if (r < 88 && r > 83){
		magic = "Don't count on it";
	} else if (r < 84 && r > 79){
		magic = "The stars say no";
	} else if (r < 80 && r > 75){
		magic = "You can count on it";
	} else if (r < 76 && r > 71){
		magic = "I'd rather not say...";
	} else if (r < 72 && r > 67){
		magic = "Doubtful";
	} else if (r < 68 && r > 63){
		magic = "Try asking in a different way";
	} else if (r < 64 && r > 59){
		magic = "That's a dumb question";
	} else if (r < 60 && r > 55){
		magic = "If you have to ask, you'll never know";
	} else if (r < 56 && r > 51){
		magic = "Outlook not so good";
	}  else if (r < 52 && r > 47){
		magic = "Chances are slim";
	} else if (r < 48 && r > 43){
		magic = "Most likely";
	} else if (r < 44 && r > 39){
		magic = "Definitely";
	} else if (r < 40 && r > 35){
		magic = "Not going to say 'yes' but it's looking like it";
	} else if (r < 36 && r > 31){
		magic = "Not going to say 'no' but it's looking like it";
	} else if (r < 32 && r > 27){
		magic = "Probably";
	} else if (r < 28 && r > 23){
		magic = "Probably not";
	} else if (r < 24 && r > 19){
		magic = "Concentrate harder and ask again";
	} else if (r < 20 && r > 15){
		magic = "Hehe yeah... YEAH BABY! yeah";
	} else if (r < 16 && r > 11){
		magic = "Can you try asking again?";
	} else if (r < 12 && r > 7){
		magic = "Out fighting fires, ask me later";
	} else if (r < 8 && r > 5){
		magic = "Ima answer all your questions given time its tough \n" +
			"to be a GroupMe bot and be online and stuff \n" +
			"you get to make money , sleep, and you light the 'puff' \n" +
			"but I'm basically a servant, yeah my life is rough \n" +
			"so read between the lines and yeah.. I don't know where I'm going with this.  I don't have an answer for you...";
	} else if (r < 6 && r > 2){
		magic = "4";
	} else if (r < 3 && r > 0){
		magic = "This group was better when I was real";
	} 
	var botResponse = magic;
	postMessage(botResponse);
}

//Play with Coin Flipper
function coinFlipper()
{
	var r = Math.random();
		var theflip = 'Heads';
		if (r < 0.5) {
			theflip = 'Tails';
		}
		var botResponse = theflip ;
		postMessage(botResponse);
}



//Post to Groupme
function postMessage(botResponse)
{
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
