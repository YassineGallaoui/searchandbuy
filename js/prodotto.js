function logout(){																				//FUNZIONE DI LOGOUT
	localStorage.removeItem("utenteloggato");
}

var lista;																									//CARICO LA LISTA DEI PRODOTTI DAL FILE JSON
if(localStorage.getItem("prodottiimportati") === null) {
  lista = JSON.stringify(dati);
  localStorage.setItem("prodottiimportati", lista);
}
lista = JSON.parse(localStorage.getItem("prodottiimportati"));

function apriprodotto(idProdottoDaAprire){
  if(localStorage.getItem("utenteloggato") === null) {
    document.getElementById("togli_logout").style.display="none";
    document.getElementById("togli_carrello").style.display="none";
    document.getElementById("togli_account").style.display="none";
		document.getElementById("togli_acquisti").style.display="none";
  }	else{
    document.getElementById("togli_login").style.display="none";
		var clienti=JSON.parse(localStorage.getItem("clienti"));
		var utenteLoggato=JSON.parse(localStorage.getItem("utenteloggato"));
		var cliente=utenteLoggato[1];
		var nomecliente=(clienti[cliente])[7];
		document.getElementById("nomeclient").innerHTML=nomecliente;
  }
  var contenitore_prodotto = document.createElement("div");
  var divimmagine = document.createElement("div");
  var immagine = document.createElement("img");
  var caratteristiche_prodotto = document.createElement("div");
  var titolo_prodotto = document.createElement("h1");
  var spazio_prezzo = document.createElement("h3");
  var p=document.createElement("div");
  var informazioni_venditore = document.createElement("div");
  var numeroarticoli = lista.prodotti[idProdottoDaAprire].quantita;
  document.getElementById("nProdDisp").innerHTML=numeroarticoli+" pezzi";
	document.getElementById("selezionaq").setAttribute("max", numeroarticoli);
	if(numeroarticoli===0) {
		document.getElementById("nProdDisp").style.color="red";
    document.getElementById("nProdDisp").style.fontWeight="bold";
		document.getElementById("selezionaq").setAttribute("value", 0);
	}
  var nome = document.createTextNode(lista.prodotti[idProdottoDaAprire].nome);
  var prezzo = document.createTextNode(lista.prodotti[idProdottoDaAprire].prezzo+" €");
  var descrizione = document.createTextNode(lista.prodotti[idProdottoDaAprire].descrizione);
  var informazioni_v = document.createTextNode("Venditore: "+lista.prodotti[idProdottoDaAprire].venditore);
  var urlimg=lista.prodotti[idProdottoDaAprire].urlimmagine;
  contenitore_prodotto.setAttribute("id", "contenitore_prodotto");
  caratteristiche_prodotto.setAttribute("id", "caratteristiche_prodotto");
  divimmagine.setAttribute("id", "immagine");
  immagine.setAttribute("src", urlimg);
  titolo_prodotto.setAttribute("id", "nomedelprodotto");
  informazioni_venditore.setAttribute("id", "informazioni_venditore");
  divimmagine.appendChild(immagine);
  contenitore_prodotto.appendChild(divimmagine);
  titolo_prodotto.appendChild(nome);
  caratteristiche_prodotto.appendChild(titolo_prodotto);
  spazio_prezzo.appendChild(prezzo);
  caratteristiche_prodotto.appendChild(spazio_prezzo);
  p.appendChild(descrizione);
  caratteristiche_prodotto.appendChild(p);
  contenitore_prodotto.appendChild(caratteristiche_prodotto);
  informazioni_venditore.appendChild(informazioni_v);
  contenitore_prodotto.appendChild(informazioni_venditore);
  document.getElementById("corpo").appendChild(contenitore_prodotto);
}

function inseriscinelcarrello(){										                  //FUNZIONE PER INSERIRE NEL CARRELLO UNO O PIÙ PRODOTTI
  if(localStorage.getItem("utenteloggato")===null){
    alert("Impossibile inserire elemento nel carrello!\n\nIscriviti o fai il login per poter acquistare il prodotto!\n\n");
    return;
  }
  var numero_prodotto=JSON.parse(localStorage.getItem("prodottodaaprire"));
  var prodotti=JSON.parse(localStorage.getItem("prodottiimportati"));
  var prodotto=prodotti.prodotti[numero_prodotto];
  var quantita=prodotto.quantita;
  var nprodotti_da_acquistare=document.getElementById("selezionaq").value*1;
	var price=prodotto.prezzo;
  if(quantita===0){
    document.getElementById("nProdDisp").style.color="red";
    document.getElementById("nProdDisp").style.fontWeight="bold";
    alert("Non sono più disponibili pezzi di questo prodotto!\n\nSearch&Buy cercherà di rifornirsi al più presto per garantire un servizio completo!\n\n");
    return;
  }
  if(nprodotti_da_acquistare>quantita){
    alert("Non è possibile acquistare o inserire nel carrello così tanti prodotti!");
    return;
  }
  var clienti=JSON.parse(localStorage.getItem("clienti"));
  var chi=JSON.parse(localStorage.getItem("utenteloggato"));
  var i=chi[1];
  var cliente=clienti[i];
  var carrello=cliente[11];
  var car=[];
  car[0]=numero_prodotto;
  car[1]=nprodotti_da_acquistare;
  carrello.push(car);
  cliente[11]=carrello;
  clienti[i]=cliente;
  localStorage.setItem("clienti", JSON.stringify(clienti));
  quantita=(quantita - nprodotti_da_acquistare);
  lista.prodotti[numero_prodotto].quantita = (lista.prodotti[numero_prodotto].quantita - nprodotti_da_acquistare);
  document.getElementById("nProdDisp").innerHTML=quantita+" pezzi";
	document.getElementById("selezionaq").setAttribute("max", quantita);
	if(nprodotti_da_acquistare>quantita) document.getElementById("selezionaq").setAttribute("value", quantita);
	localStorage.setItem("prodottiimportati", JSON.stringify(lista));
	alert("Prodotto inserito nel carrello correttamente!\n\nProdotto inserito: "+document.getElementById("nomedelprodotto").textContent+"\n\nNumero prodotti inseriri: "+nprodotti_da_acquistare+"\n\nCosto totale articoli inseriti: "+nprodotti_da_acquistare*price+" €");
  if(quantita===0){
    document.getElementById("nProdDisp").style.color="red";
    document.getElementById("nProdDisp").style.fontWeight="bold";
    return;
  }
}

function compra(){																		                    //QUANDO COMPRI DIRETTAMENTE UN PRODOTTO
  if(localStorage.getItem("utenteloggato") === null){
    alert ("Impossibile portare a termine l'acquisto!\n\nIscriviti o fai il login per poter acquistare il prodotto!");
  } else {
		var nprodotti_da_acquistare=document.getElementById("selezionaq").value*1;
		var numero_prodotto=JSON.parse(localStorage.getItem("prodottodaaprire"));
		var quantity=lista.prodotti[numero_prodotto].quantita;

		if(quantity===0){
	    alert("Non sono più disponibili pezzi di questo prodotto!\n\nSearch&Buy cercherà di rifornirsi al più presto per garantire un servizio completo!");
	    document.getElementById("nProdDisp").style.color="red";
	    document.getElementById("nProdDisp").style.fontWeight="bold";
	    return;
	  }
	  if(nprodotti_da_acquistare>quantity){
	    alert("Non è possibile acquistare o inserire nel carrello così tanti prodotti!");
	    return;
	  }

		var conferma =window.confirm("Acquistare "+nprodotti_da_acquistare+" pezzi di questo prodotto?");
		if(!conferma) return;
 
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

		var prodNelCart=[];
		prodNelCart.push(numero_prodotto);
		prodNelCart.push(nprodotti_da_acquistare);
		prodNelCart.push(distance);
    var prezzo_totale=nprodotti_da_acquistare*lista.prodotti[numero_prodotto].prezzo;
    prodNelCart.push(prezzo_totale);
		cliente[12].push(prodNelCart);
	  clienti[i]=cliente;
	  localStorage.setItem("clienti", JSON.stringify(clienti));

		quantity = (quantity - nprodotti_da_acquistare);
		if(quantity===0){
			document.getElementById("nProdDisp").innerHTML=quantity+" pezzi";
	    document.getElementById("nProdDisp").style.color="red";
	    document.getElementById("nProdDisp").style.fontWeight="bold";
	  } else {document.getElementById("nProdDisp").innerHTML=quantity+" pezzi";}
		if(nprodotti_da_acquistare>quantity) document.getElementById("selezionaq").setAttribute("value", quantity);
		document.getElementById("selezionaq").setAttribute("max", quantity);
		lista.prodotti[numero_prodotto].quantita=quantity;
		localStorage.setItem("prodottiimportati", JSON.stringify(lista));

		var nomearticolo = document.getElementById("nomedelprodotto").textContent;
    alert ("Prodotto acquistato correttamente!\n\nArticolo acquistato: "+nomearticolo+"\n\nNumero articoli acquistati:"+nprodotti_da_acquistare+"\n\nCosto articolo acquisto: "+prezzo_totale+" €");
  }
}
