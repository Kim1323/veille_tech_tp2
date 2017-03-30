console.log("AJAX");
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
APP.use(express.static('public'))  // pour utiliser le dossier public
APP.use(BODY_PARSER.json())  // pour traiter les données JSON

MONGO_CLIENT.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
	if (err)
		return console.log(err);
	db = database;
	APP.listen(PORT, () => {
		console.log('Connexion à la BD et écoute sur le port 8081');
	})
})

APP.get('/',  (req, res) => {
	console.log("hello")
	res.send('ajax_ajouter.ejs');
})
