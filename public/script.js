const BTN_NOUVEAU = document.getElementById("btn_nouveau");
const BTN_MODIFIER = document.getElementsByClassName("btn_modifier");
const FRM_AJOUT = document.getElementById("frm_ajout");
const GROUPE_BTN = document.getElementsByTagName("button");

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

FRM_AJOUT.classList.add("cacher");

//Cache et affiche le formulaire d'ajout
BTN_NOUVEAU.addEventListener("click", function(){
	(possedeClasse(FRM_AJOUT, "cacher") == false) ? 
		(ajouterClasse(FRM_AJOUT, "cacher")) : (enleverClasse(FRM_AJOUT, "cacher"))
})

for(var i = 0; i < BTN_MODIFIER.length; i++){
	BTN_MODIFIER[i].addEventListener("click", modifier);
}

/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

//Prise des nouvelles données et requête AJAX
function modifier(){
	var elmAModif = this.parentElement.parentElement.children;
	var nouvelleDonnees = { 
		"nom" : elmAModif[0].innerHTML,
		"prenom" : elmAModif[1].innerHTML,
		"telephone" : elmAModif[2].innerHTML,
		"id" : elmAModif[3].innerHTML
	}
	sNouvelleDonnee = JSON.stringify(nouvelleDonnees);

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

function cacherETAfficherElements(elementCacher, elementAfficher){
	elementCacher.addEventListener("click", function(){
		ajouterClasse(elementCacher, "cacher");
		enleverClasse(elementAfficher, "cacher");
	})
}

function ajouterClasse(element, classe){
	element.classList.add(classe);
}

function enleverClasse(element, classe){
	element.classList.remove(classe);
}

function possedeClasse( element, classe ) {
     return (" " + element.className + " " ).indexOf( " " + classe + " " ) > -1;
}