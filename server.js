const MONGO_CLIENT = require('mongodb').MongoClient
const OBJECT_ID = require('mongodb').ObjectID;
const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8081;
const BODY_PARSER = require('body-parser')

APP.set('view engine', 'ejs');
APP.use(BODY_PARSER.urlencoded({extended: true}))
APP.use(EXPRESS.static('public'))  // pour utiliser le dossier public
APP.use(BODY_PARSER.json())  // pour traiter les données JSON


/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */


//Connexion à la base de données "carnet_adresse"
MONGO_CLIENT.connect("mongodb://127.0.0.1:27017/carnet_adresse", (err, database) => {
	if (err)
		return console.log(err);
	db = database;
	APP.listen(PORT, () => {
		console.log("Connexion à la BD et écoute sur le port 8081");
	})
})

//Affichage des objets de la collection "adresse"
APP.get("/",  (req, res) => {
	db.collection("adresse").find().toArray(function(err, resultat){
		if (err)
			return console.log(err);
		res.render("index.ejs", {adresse: resultat})
	})
})


/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */


//Destruction d'un objet de la base de données avec son ID
APP.get("/detruire/:id", (req, res) => {
	console.log("Destruction de " + req.params.id);
	db.collection("adresse").findOneAndDelete(
		{"_id": OBJECT_ID(req.params.id)}, 
		(err, resultat) => {
			if (err) 
				return console.log(err);
			res.redirect("/");
		})
})

APP.post("/ajouter",  (req, res) => {
	db.collection("adresse").save(req.body, (err, result) => {
		if (err)
			return console.log(err);
		console.log("ajouter");
	})
})


/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

//Modification d'un objet de la base de données
APP.post("/modifier", (req, res) => {
	db.collection('adresse').update(
		{"_id": OBJECT_ID(req.body.id)}, { 
			$set: {
				"nom": req.body.nom, 
				"prenom": req.body.prenom, 
				"telephone": req.body.telephone
			} 
		}, (err, resultat) => {
		if (err) 
			return console.log(err);
	})
})




/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

//Triage des objets par nom en ordre ascendant ou descendant
APP.get("/trier", (req, res) => {
	console.log("trier");
	//db.collection("adresse").find().sort( { nom: 1 } );
	res.redirect("/");

})