const MONGO_CLIENT = require('mongodb').MongoClient
const OBJECT_ID = require('mongodb').ObjectID;
const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8081;


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
	res.send("hi");
	db.collection('adresse').find().toArray(function(err, resultat){
		if (err)
			return console.log(err);
		console.log(resultat);
	})
})
