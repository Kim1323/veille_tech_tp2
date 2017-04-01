const BTN_NOUVEAU = document.getElementById("btn_nouveau"); //Bouton pour le formulaire d'ajout
const BTN_MODIFIER = document.getElementsByClassName("btn_modifier"); //Boutons de modification
const FRM_AJOUT = document.getElementById("frm_ajout"); //Bouton d'ajout

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

FRM_AJOUT.classList.add("cacher"); //Cache le formulaire d'ajout

//Cache et affiche le formulaire d'ajout
BTN_NOUVEAU.addEventListener("click", function(){
	if(possedeClasse(FRM_AJOUT, "cacher") == true){
		enleverClasse(FRM_AJOUT, "cacher");
		ajouterClasse(FRM_AJOUT, "centrer");
	} else {
		ajouterClasse(FRM_AJOUT, "cacher");
		enleverClasse(FRM_AJOUT, "centrer");
	}
})

//Ajoute de la fonction modifier() aux boutons concernés
for(var i = 0; i < BTN_MODIFIER.length; i++){
	BTN_MODIFIER[i].addEventListener("click", modifier);
}

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

//Prise des nouvelles données et requête AJAX
function modifier(){
	//Savegarde des nouvelles données dans une variable
	var elmAModif = this.parentElement.parentElement.children;
	var nouvelleDonnees = { 
		"nom" : elmAModif[0].innerHTML,
		"prenom" : elmAModif[1].innerHTML,
		"telephone" : elmAModif[2].innerHTML,
		"id" : elmAModif[3].innerHTML
	}
	sNouvelleDonnee = JSON.stringify(nouvelleDonnees);
	console.log(sNouvelleDonnee)
	//Envoie de la requête
	xhr = new XMLHttpRequest();
	xhr.open('POST', "modifier", true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(sNouvelleDonnee);
	xhr.addEventListener("readystatechange", traiterRequest, false);

}

//Vérification de la requête
function traiterRequest(e){
	console.log("xhr.readyState = " + xhr.readyState)
	console.log("xhr.status = " + xhr.status)
	if(xhr.readyState == 4 && xhr.status == 200){
		console.log('ajax fonctionne')
	}
}

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

//Fonction qui ajoute une classe à un élément
function ajouterClasse(element, classe){
	element.classList.add(classe);
}

//Fonction qui enlève une classe d'un élément
function enleverClasse(element, classe){
	element.classList.remove(classe);
}

//Fonction qui vérifie si un élément possède une classe spécifique
function possedeClasse( element, classe ) {
     return (" " + element.className + " " ).indexOf( " " + classe + " " ) > -1;
}