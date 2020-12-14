function logout(){																				//FUNZIONE DI LOGOUT
	localStorage.removeItem("utenteloggato");
}

var lista;																									//CARICO LA LISTA DEI PRODOTTI DAL FILE JSON
if(localStorage.getItem("prodottiimportati") === null) {
  lista = JSON.stringify(dati);
  localStorage.setItem("prodottiimportati", lista);
}
lista = JSON.parse(localStorage.getItem("prodottiimportati"));


function visualizzabag(){											//VISUALIZZARE TUTTI I PRODOTTI NELLA PAGINA DEL CARRELLO
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
  var bag=cliente[12];
  var prezzo_totale=0;
  var ntotarticoli=0;
  for(var posizioneNellaListaAcquisti=0; posizioneNellaListaAcquisti<bag.length; posizioneNellaListaAcquisti++) {
    var idProduct=(bag[posizioneNellaListaAcquisti])[0];
    var quantita=(bag[posizioneNellaListaAcquisti])[1] * 1;
    var nome = document.createTextNode(lista.prodotti[idProduct].nome);
    var descrizione =  document.createTextNode(lista.prodotti[idProduct].descrizione);
    var prezzo = (bag[posizioneNellaListaAcquisti])[3];
    prezzo_totale=prezzo+prezzo_totale;
    ntotarticoli=ntotarticoli+quantita;
    var urlimg = lista.prodotti[idProduct].urlimmagine;
    var nomeNoObj=lista.prodotti[idProduct].nome;
    creadivprodotto(idProduct, quantita, posizioneNellaListaAcquisti, nome, nomeNoObj, descrizione, prezzo, urlimg);
  }
	document.getElementById("numero_totale_acquisti").innerHTML=ntotarticoli;
  document.getElementById("costo_totale_acquisti").innerHTML=prezzo_totale+ " ";

	var nomecliente=cliente[7];
	document.getElementById("nomeclient").innerHTML=nomecliente;
}

function creadivprodotto(idProduct, quantita, posizioneNellaListaAcquisti, nome, nomeNoObj, descrizione, prezzo, urlimg){				//CREAZIONE DEI SINGOLI PRODOTTI NELLA PAGINA DEL CARRELLO
  var prodotti_nel_bag = document.createElement("div");
  var immagine=document.createElement("img");
  var descrizione_prodotto_in_bag = document.createElement("div");
  var nome_prodotto=document.createElement("span");
  var acapo=document.createElement("br");
  var prezzo_bag = document.createElement("div");
  var prezzo_numero = document.createElement("div");
  var bottone_compra_singolo = document.createElement("button");
  var compra=document.createTextNode("Compra ancora!");
  var divrimozione = document.createElement("div");
  var testonome=document.createTextNode(nomeNoObj+" x "+quantita);

	var dataFissa = new Date("Mar 25, 2019 17:00:00").getTime();
	dataFissa=dataFissa/1000;
	dataFissa=dataFissa/60;
	dataFissa=Math.round(dataFissa);
  var now = new Date().getTime();
  now=now/1000;
  now=now/60;
  now=Math.round(now);
  var distance2 = now - dataFissa;
	var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var ii=chi[1];
  var cliente=clienti[ii];
	var distance1=((cliente[12])[posizioneNellaListaAcquisti])[2];
	var distance=distance2-distance1;
	if(distance<=1440) {
		divrimozione.setAttribute("class", "rimuovi_elemento");
	  divrimozione.style.backgroundImage = "url('img/delete.png')";
	  divrimozione.style.backgroundSize = "14px 14px";
	  divrimozione.setAttribute("onclick", "rimuoviElemento("+posizioneNellaListaAcquisti+","+idProduct+")");
	}

  prodotti_nel_bag.setAttribute("class", "prodotti_nel_carrello");
  descrizione_prodotto_in_bag.setAttribute("class", "descrizione_prodotto_in_carrello");
  nome_prodotto.setAttribute("class", "nome_prodotto");
  prezzo_bag.setAttribute("class", "prezzo_carrello");
  immagine.setAttribute("src", urlimg);
  prezzo_numero.setAttribute("class", "prezzo_numero");
  bottone_compra_singolo.setAttribute("class", "bottone_compra_singolo");
  bottone_compra_singolo.setAttribute("onclick", "faiAcquisto("+idProduct+")");

  nome_prodotto.appendChild(testonome);
  descrizione_prodotto_in_bag.appendChild(nome_prodotto);
  descrizione_prodotto_in_bag.appendChild(acapo);
  descrizione_prodotto_in_bag.appendChild(descrizione);
  prodotti_nel_bag.appendChild(immagine);
  prodotti_nel_bag.appendChild(descrizione_prodotto_in_bag);
  prezzo_numero.appendChild(document.createTextNode(prezzo+" €"));
  prezzo_bag.appendChild(prezzo_numero);
  bottone_compra_singolo.appendChild(compra);
  prezzo_bag.appendChild(bottone_compra_singolo);
	if(distance<=1440) {
		prodotti_nel_bag.appendChild(divrimozione);
	}
  prodotti_nel_bag.appendChild(prezzo_bag);

  document.getElementById("corpo").appendChild(prodotti_nel_bag);
}

function faiAcquisto(idProduct){
	localStorage.setItem("prodottodaaprire", JSON.stringify(idProduct));
	window.location.assign("prodotto.html");
}

function rimuoviElemento(posizioneNellaListaAcquisti, idProduct){															//QUANDO SI RIMUOVE UN ELEMENTO DAL CARRELLO
  var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var i=chi[1];
  var cliente=clienti[i];
  var listaacquisti=cliente[12];
	var nProd=(listaacquisti[posizioneNellaListaAcquisti])[1]*1;
	var conferma =window.confirm("Sei sicuro di voler annullare questo acquisto?");
	if(!conferma) return;
	lista.prodotti[idProduct].quantita=lista.prodotti[idProduct].quantita+nProd;
  listaacquisti.splice(posizioneNellaListaAcquisti, 1);
  cliente[12]=listaacquisti;
  clienti[i]=cliente;
  localStorage.setItem("clienti", JSON.stringify(clienti));
	localStorage.setItem("prodottiimportati", JSON.stringify(lista));
  alert("Acquisto annullato con successo!");
  window.location.reload();
}
