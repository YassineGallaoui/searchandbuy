function logout(){																				//FUNZIONE DI LOGOUT
	localStorage.removeItem("utenteloggato");
}

var oggetto;																									//CARICO LA LISTA DEI PRODOTTI DAL FILE JSON
if(localStorage.getItem("prodottiimportati") === null) {
  oggetto = JSON.stringify(dati);
  localStorage.setItem("prodottiimportati", oggetto);
}
oggetto = JSON.parse(localStorage.getItem("prodottiimportati"));
lista = oggetto.prodotti;
var l=lista.length;
var utenteLoggato = JSON.parse(localStorage.getItem("utenteloggato"));
var numeroVenditore = utenteLoggato[1];
var venditori = JSON.parse(localStorage.getItem("venditori"));
var venditore = venditori[numeroVenditore];
var usernameVenditore = venditore[9];

function settaNome(){
	document.getElementById("nomevend").innerHTML=usernameVenditore;
}

function registraProdotto(){
	var name = document.getElementById("nome").value;
	if (name==="" || !(document.getElementById("nome").checkValidity())) {
		alert("ATTENZIONE!\n\nInserire un nome per il prodotto ACCETTABILE");
		return;
	}
	var price = document.getElementById("prezzo").value*1;
	if (price==="" || !(document.getElementById("prezzo").checkValidity())) {
		alert("ATTENZIONE!\n\nInserire un prezzo ACCETTABILE");
		return;
	}
	if (price===0) {
		var conferma =window.confirm("ATTENZIONE!\n\nSei sicuro di voler REGALARE questi prodotti?");
		if(!conferma) return;
	}
	var category="";
	if (document.getElementById("ele1").checked===true)		category="elettronica";
	if (document.getElementById("ele2").checked===true)		category="elettrodomestici";
	if (document.getElementById("canc").checked===true)		category="cancelleria";
	if (document.getElementById("gioc").checked===true)		category="giocattoli";
	if (document.getElementById("fit").checked===true)		category="sport";
	if (category==="") {
		alert("ATTENZIONE!\n\nInserire una categoria di appartenenza");
		return;
	}
	var urlimmagine = document.getElementById("urlimg").value;
	if (urlimmagine==="") {
		alert("ATTENZIONE!\n\nInserire un URL dell'immagine valido");
		return;
	}
	var quantity = document.getElementById("quantita").value*1;
	if (quantity==="" || quantity===0  || !(document.getElementById("quantita").checkValidity())) {
		alert("ATTENZIONE!\n\nInserire una quantità positiva del prodotto");
		return;
	}
	var spedition = document.getElementById("seleziona").value;
	var description = document.getElementById("descrizione").value;
	if (description==="") {
		console.log(description);
		alert("ATTENZIONE!\n\nInserire una descrizione!");
		return;
	}
	var prodotto={
	"nome": name,
	"prezzo": price,
	"categoria": category,
	"urlimmagine": urlimmagine,
	"quantita": quantity,
	"spedizione": spedition,
	"venditore": usernameVenditore,
	"descrizione": description
	}
alert("Prodotto registrato correttamente!\n\nNome: "+name+"\n\nPrezzo: "+price+" €\n\nQuantità: "+quantity+"\n\nDescrizione: "+description+"\n\n");
lista.push(prodotto);
oggetto.prodotti=lista;
localStorage.setItem("prodottiimportati", JSON.stringify(oggetto));
}