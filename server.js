const MONGO_CLIENT = require('mongodb').MongoClient
const OBJECT_ID = require('mongodb').ObjectID;
const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8081;

APP.set('view engine', 'ejs'); // générateur de template 


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
	db.collection('adresse').find().toArray(function(err, resultat){
		if (err)
			return console.log(err);
		res.render('index.ejs', {adresse: resultat})
	})
})

APP.get('/detruire/:id', (req, res) => {
	var id = req.params.id;
	console.log(id);
	db.collection('adresse').findOneAndDelete(
		{"_id": OBJECT_ID(req.params.id)}, 
		(err, resultat) => {
			if (err) 
				return console.log(err);
			res.redirect('/');
		})
})
