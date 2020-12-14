function logout(){																				//FUNZIONE DI LOGOUT
	localStorage.removeItem("utenteloggato");
}

var lista;																									//CARICO LA LISTA DEI PRODOTTI DAL FILE JSON
if(localStorage.getItem("prodottiimportati") === null) {
  lista = JSON.stringify(dati);
  localStorage.setItem("prodottiimportati", lista);
}
lista = JSON.parse(localStorage.getItem("prodottiimportati"));


function visualizzacarrello(){											//VISCUALIZZARE TUTTI I PRODOTTI NELLA PAGINA DEL CARRELLO
  if(localStorage.getItem("utenteloggato") === null) {
    document.getElementById("togli_logout").style.display="none";
    document.getElementById("togli_carrello").style.display="none";
    document.getElementById("togli_account").style.display="none";
  }	else{
    document.getElementById("togli_login").style.display="none";
  }

  var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var i=chi[1];
  var cliente=clienti[i];
  var carrello=cliente[11];
  var prezzo_totale=0;
  var ntotarticoli=0;
	var nomecliente=cliente[7];
	document.getElementById("nomeclient").innerHTML=nomecliente;
  for(var posizioneNelCarrello=0; posizioneNelCarrello<carrello.length; posizioneNelCarrello++) {
    var idProduct=(carrello[posizioneNelCarrello])[0];
    var quantita=(carrello[posizioneNelCarrello])[1] * 1;
    var nome = document.createTextNode(lista.prodotti[idProduct].nome);
    var descrizione =  document.createTextNode(lista.prodotti[idProduct].descrizione);
    var prezzo =  lista.prodotti[idProduct].prezzo*quantita;
    prezzo_totale=prezzo+prezzo_totale;
    ntotarticoli=ntotarticoli+quantita;
    var urlimg = lista.prodotti[idProduct].urlimmagine;
    var nomeNoObj=lista.prodotti[idProduct].nome;
    creadivprodotto(idProduct, quantita, posizioneNelCarrello, nome, nomeNoObj, descrizione, prezzo, urlimg);
  }
  document.getElementById("numero_totale_articoli").innerHTML=ntotarticoli;
  document.getElementById("costo_totale").innerHTML=prezzo_totale+ " ";
}

function creadivprodotto(idProduct, quantita, posizioneNelCarrello, nome, nomeNoObj, descrizione, prezzo, urlimg){				//CREAZIONE DEI SINGOLI PRODOTTI NELLA PAGINA DEL CARRELLO
  var prodotti_nel_carrello = document.createElement("div");
  var immagine=document.createElement("img");
  var descrizione_prodotto_in_carrello = document.createElement("div");
  var nome_prodotto=document.createElement("span");
  var acapo=document.createElement("br");
  var prezzo_carrello = document.createElement("div");
  var prezzo_numero = document.createElement("div");
  var bottone_compra_singolo = document.createElement("button");
  var compra=document.createTextNode("Compra !");
  var divrimozione = document.createElement("div");
  var testonome=document.createTextNode(nomeNoObj+" x "+quantita);

  prodotti_nel_carrello.setAttribute("class", "prodotti_nel_carrello");
  divrimozione.setAttribute("class", "rimuovi_elemento");
  divrimozione.style.backgroundImage = "url('img/delete.png')";
  divrimozione.style.backgroundSize = "14px 14px";
  divrimozione.setAttribute("onclick", "rimuoviElemento("+posizioneNelCarrello+","+idProduct+")");
  descrizione_prodotto_in_carrello.setAttribute("class", "descrizione_prodotto_in_carrello");
  nome_prodotto.setAttribute("class", "nome_prodotto");
  prezzo_carrello.setAttribute("class", "prezzo_carrello");
  immagine.setAttribute("src", urlimg);
  prezzo_numero.setAttribute("class", "prezzo_numero");
  bottone_compra_singolo.setAttribute("class", "bottone_compra_singolo");
  bottone_compra_singolo.setAttribute("onclick", "confermaSingoloAcquisto("+prezzo+","+posizioneNelCarrello+", "+quantita+", '"+nomeNoObj+"')");

  nome_prodotto.appendChild(testonome);
  descrizione_prodotto_in_carrello.appendChild(nome_prodotto);
  descrizione_prodotto_in_carrello.appendChild(acapo);
  descrizione_prodotto_in_carrello.appendChild(descrizione);
  prodotti_nel_carrello.appendChild(immagine);
  prodotti_nel_carrello.appendChild(descrizione_prodotto_in_carrello);
  prezzo_numero.appendChild(document.createTextNode(prezzo+" €"));
  prezzo_carrello.appendChild(prezzo_numero);
  bottone_compra_singolo.appendChild(compra);
  prezzo_carrello.appendChild(bottone_compra_singolo);
  prodotti_nel_carrello.appendChild(divrimozione);
  prodotti_nel_carrello.appendChild(prezzo_carrello);

  document.getElementById("corpo").appendChild(prodotti_nel_carrello);
}

function confermaSingoloAcquisto(prezzo, posizioneNelCarrello, quantity, nomeNoObj){									//QUANDO VIENE ACQUISTATO UN SINGOLO PRODOTTO

	var conferma =window.confirm("Acquistare "+quantity+" pezzi di questo prodotto?");
	if(!conferma) return;

	alert ("Acquisto confermato!\n\nNumero articoli acquistati: "+quantity+".\n\nProdotto acquistato: "+nomeNoObj+"\n\nCosto complessivo acquisto: "+prezzo+" €.");

  //conto quanti minuti sono passati da una data stabilita da me stesso: l'1 gennaio 2019 alle 01:00:00
	var dataFissa = new Date("Mar 25, 2019 17:00:00").getTime();
	dataFissa=dataFissa/1000;
	dataFissa=dataFissa/60;
	dataFissa=Math.round(dataFissa);

  var now = new Date().getTime();
  now=now/1000;
  now=now/60;
  now=Math.round(now);

  var distance = now - dataFissa;

	var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var i=chi[1];
  var cliente=clienti[i];
  var carrello=cliente[11];
	var prodNelCart=carrello[posizioneNelCarrello];
	prodNelCart.push(distance);
  prodNelCart.push(prezzo);
	cliente[12].push(prodNelCart);
  carrello.splice(posizioneNelCarrello, 1);
  cliente[11]=carrello;
  clienti[i]=cliente;
  localStorage.setItem("clienti", JSON.stringify(clienti));
  window.location.reload();
}

function confermaTuttiGliAcquisti(){
	var numeroarticoli = document.getElementById("numero_totale_articoli").textContent;
  var prezzototale = document.getElementById("costo_totale").textContent;
  if(numeroarticoli==="0"){
    alert ("Nessun elemento nel carrello!\n\nCerca dei prodotti, visualizzali e clicca sull'apposito bottone per aggiungerli al carrello!");
    return;
  } else {
		var conferma =window.confirm("Acquistare "+numeroarticoli+" prodotti, per un totale di "+prezzototale+" € ?");
		if(!conferma) return;
    alert ("Acquisto confermato!\n\nNumero articoli acquistati: "+numeroarticoli+"\n\nCosto complessivo acquisto: "+prezzototale+" €");
  }

	var dataFissa = new Date("Mar 25, 2019 17:00:00").getTime();
	dataFissa=dataFissa/1000;
	dataFissa=dataFissa/60;
	dataFissa=Math.round(dataFissa);

	var now = new Date().getTime();
	now=now/1000;
	now=now/60;
	now=Math.round(now);

	var distance = now - dataFissa;

	var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var i=chi[1];
  var cliente=clienti[i];
  var carrello=cliente[11];
	for(var p=0; p<carrello.length; p++) {
		carrello[p].push(distance);
    var prezzo_finale=lista.prodotti[(carrello[p])[0]].prezzo * (carrello[p])[1];
    carrello[p].push(prezzo_finale);
		cliente[12].push(carrello[p]);
	}
	for(var q=carrello.length-1; q>=0; q--) {
		carrello.splice(q, 1);
	}
  cliente[11]=carrello;
  clienti[i]=cliente;
  localStorage.setItem("clienti", JSON.stringify(clienti));
	window.location.reload();
}

function rimuoviElemento(posizioneNelCarrello, idProduct){															//QUANDO SI RIMUOVE UN ELEMENTO DAL CARRELLO
  var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var i=chi[1];
  var cliente=clienti[i];
  var carrello=cliente[11];
	var nProdCatalogo=(carrello[posizioneNelCarrello])[1]*1;
	var conferma =window.confirm("Rimuovere dal carrello questo prodotto?");
	if(!conferma) return;
	lista.prodotti[idProduct].quantita=lista.prodotti[idProduct].quantita+nProdCatalogo;
  carrello.splice(posizioneNelCarrello, 1);
  cliente[11]=carrello;
  clienti[i]=cliente;
  localStorage.setItem("clienti", JSON.stringify(clienti));
	localStorage.setItem("prodottiimportati", JSON.stringify(lista));
  alert("Prodotto rimosso dal carrello con successo!");
  window.location.reload();
}

function eliminaTuttiIProdotti(){
  var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var i=chi[1];
  var cliente=clienti[i];
  var carrello=cliente[11];
	if(window.location.pathname==="/C:/Users/yax97/Desktop/source%20code%20AWC/carrello.html"){
		var conferma =window.confirm("Rimuovere dal carrello tutti i prodotti?");
		if(!conferma) return;
	}
	for(y=0; y<carrello.length; y++){
		var nProdCatalogo=(carrello[y])[1]*1;
		var posizione=(carrello[y])[0];
		lista.prodotti[posizione].quantita=lista.prodotti[posizione].quantita+nProdCatalogo;
	}
	localStorage.setItem("prodottiimportati", JSON.stringify(lista));
  carrello=[];
  cliente[11]=carrello;
  clienti[i]=cliente;
  localStorage.setItem("clienti", JSON.stringify(clienti));
  window.location.reload();
}
