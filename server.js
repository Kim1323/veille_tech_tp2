const MONGO_CLIENT = require('mongodb').MongoClient
const OBJECT_ID = require('mongodb').ObjectID;
const EXPRESS = require("express");
const APP = EXPRESS();
const XML_HTTP_REQUEST = require("xmlhttprequest").XMLHttpRequest;
const XHR = new XML_HTTP_REQUEST();
const PORT = 8081;
const BODY_PARSER= require('body-parser')

APP.set('view engine', 'ejs');
APP.use(BODY_PARSER.urlencoded({extended: true}))
APP.use(EXPRESS.static('public'))  // pour utiliser le dossier public
APP.use(BODY_PARSER.json())  // pour traiter les données JSON


MONGO_CLIENT.connect("mongodb://127.0.0.1:27017/carnet_adresse", (err, database) => {
	if (err)
		return console.log(err);
	db = database;
	APP.listen(PORT, () => {
		console.log("Connexion à la BD et écoute sur le port 8081");
	})
})

APP.get("/",  (req, res) => {
	db.collection("adresse").find().toArray(function(err, resultat){
		if (err)
			return console.log(err);
		res.render("index.ejs", {adresse: resultat})
	})
})

APP.get("/detruire/:id", (req, res) => {
	var id = req.params.id;
	console.log(id);
	db.collection("adresse").findOneAndDelete(
		{"_id": OBJECT_ID(req.params.id)}, 
		(err, resultat) => {
			if (err) 
				return console.log(err);
			res.redirect("/");
		})
})


/*
APP.post('/nouveau', (req, res) => {
	xhr = new XML_HTTP_REQUEST();
	xhr.open('POST', "modifier", true);
	data = { 
		"modif":{
			"nom" : "AJAX_nom",
			"prenom" : "AJAX_prenom",
			"telephone" : "AJAX_telephone"
		}
	}
	sData = JSON.stringify(data);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(sData);
	xhr.addEventListener("readystatechange", traiterRequest, false);
})

function traiterRequest(e) {
	console.log("xhr.readyState = " + xhr.readyState)
	console.log("xhr.status = " + xhr.status)
	if(xhr.readyState == 4 && xhr.status == 200) {
		console.log('ajax fonctionne')
		
		var response = JSON.parse(xhr.responseText);
		console.log(xhr.responseText);
		elmChamp_id.innerHTML = response[0]._id
		elmLigne.style.backgroundColor = "#0f0"
	}
}

*/


APP.post("/trier", (req, res) => {
	console.log("trier");
	res.redirect("/");
})

APP.post("/nouveau", (req, res) => {
	console.log("nouveau");
	//res.redirect("/");
	requeteAJAX("GET", "nouveau");
})

APP.post("/modifier", (req, res) => {
	console.log("modifier");
	res.redirect("/");
})

let requeteAJAX = (methode, url) => {
	XHR.open('GET', "nouveau", true);
	console.log("xhr.readyState = " + XHR.readyState)
	console.log("xhr.status = " + XHR.status)
	console.log("requeteAJAX pour " + methode + " à " + url);
	//XHR.send();
	//XHR.addEventListener("readystatechange", traiterRequete, false);
	//XHR.onreadystatechange = traiterRequete;
}

let traiterRequete = (e) => {
	if (XHR.readyState == 4 && XHR.status == 200) {
        console.log("traiterRequete");
    }
}
